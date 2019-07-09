from mlpython.app import db
from flask import request
from flask import jsonify
from ..token import Token
from ..users import User
from ..status_project import Status_Project
import sys
import json
import boto3


class Project(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    json = db.Column(db.String())
    frontendVersion = db.Column(db.String(10))
    backendVersion = db.Column(db.String(10))
    user_id = db.Column(
        db.Integer, db.ForeignKey('user.id')
    )
    user = db.relationship('User')
    machine_ami_id = db.Column(db.String(100))
    machine_type = db.Column(db.String(100))
    cloud = db.Column(db.String(100))

    # machine stoped then up again
    def up_again_machine(self):
        ec2 = boto3.resource(
           'ec2',
           aws_access_key_id=self.user.company.aws_key.strip(),
           aws_secret_access_key=self.user.company.aws_secret.strip(),
           region_name='us-east-1'
           )
        ec2.start_instances(InstanceIds=[self.machine_type_id])
        # ec2.instances.filter(InstanceIds = [self.machine_ami_id]).start()

        return None

    # terminate machine indefinidamente
    def hibernate_machine(self):
        ec2 = boto3.resource(
            'ec2',
            aws_access_key_id=self.user.company.aws_key.strip(),
            aws_secret_access_key=self.user.company.aws_secret.strip(),
            region_name='us-east-1'
            )
        ec2.instances.filter(InstanceIds = [self.machine_ami_id]).stop(Hibernate=True)
        db.session.commit()
        return None

    # terminate machine indefinidamente
    def terminate_machine(self):
        print("remove actual instance and create new one")
        ec2 = boto3.resource(
            'ec2',
            aws_access_key_id=self.user.company.aws_key.strip(),
            aws_secret_access_key=self.user.company.aws_secret.strip(),
            region_name='us-east-1'
            )
        ec2.instances.filter(InstanceIds = [self.machine_ami_id]).terminate()
        self.machine_ami_id = None
        self.machine_type = None
        self.cloud = None
        db.session.commit()
        return None

    def run_machine(self, machine_type, cloud):
        if self.machine_ami_id is None:
            if cloud == "AWS":
                ec2 = boto3.resource(
                    'ec2',
                    aws_access_key_id=self.user.company.aws_key.strip(),
                    aws_secret_access_key=self.user.company.aws_secret.strip(),
                    region_name='us-east-1'
                )
                instance = ec2.create_instances(
                        ImageId='ami-0cc96feef8c6bbff3', 
                        MinCount=1, MaxCount=1,
                        InstanceType=machine_type,
                        KeyName="MambaMLEUEast",
                        Placement={'AvailabilityZone':'us-east-1b'},
                        HibernationOptions={'Configured': False},
                        BlockDeviceMappings=[{
                            'DeviceName': 'xvdh',
                            'Ebs':{
                                'VolumeSize': 123,
                                'Encrypted': False,
#                                'KmsKeyId': 'MambaMLEUEast'
                                }
                            }
                            ]
                        )
                self.machine_ami_id = instance[0].id
                self.machine_type  = machine_type
                self.cloud = cloud
                db.session.commit()
                print("INSTANCE-->", instance)
                return instance[0].id
        else:
            # si el proyecto ya tiene maquina asignada
            if ((machine_type != self.machine_type) or 
                    (cloud != self.cloud)):
                    print("remove actual instance and create new one")
                    self.terminate_machine()
                    db.session.commit()
                    self.run_machine(machine_type, cloud)
            else:
                # si la maquina esta stopped then we UP again
                self.up_again_machine()
        return None


    def serialize(self):
        model={}
        model['id'] = self.id
        model['name'] = self.name
        model['json'] = self.json
        model['user_id'] = self.user_id
        model['frontendVersion'] = self.frontendVersion
        model['backendVersion'] = self.backendVersion

        return model

    @classmethod
    def create(cls, name, json, user_id, frontendVersion, backendVersion):
        model = cls()
        model.name = name
        model.json = json
        model.user_id = user_id
        model.frontendVersion = frontendVersion
        model.backendVersion = backendVersion
        db.session.add(model)
        db.session.commit()
        return model

    @classmethod
    def update(cls, model, name, json, user_id, frontendVersion, backendVersion):
        
        model.name = name
        model.json = json
        model.user_id = user_id
        model.frontendVersion = frontendVersion
        model.backendVersion = backendVersion
#        db.session.add(model)
        db.session.commit()
        return model

    @classmethod
    def security_check(cls, project, userLogged, action):
        # TODO given action project and user return if can do
        return True

    def run(self, task):
        status = Status_Project.query.filter(Status_Project.project_id==self.id).first()
        if status:
            status.task = task
            status.status = json.dumps({"project_stat":"PENDING"})
            db.session.commit()
        else:
            new = Status_Project.create(self.id, task,json.dumps({"project_stat":"PENDING"}))
        
        # jsondata = self.json
        # jsondata = json.dump(jsondata)
        # db.session.commit()
        return self

    def update_task_status(self, task, stat):

        status = Status_Project.query.filter(Status_Project.project_id==self.id).first()
        if status:
            print("aaaaa-->", status.status)
            j_data = json.loads(status.status)
            if task in j_data:
                j_data[task] = stat
            else:
                j_data[task] = stat

            status.status = json.dumps(j_data)

            db.session.commit()
        return None

    def update_status(self, data, stat, error):
        status = Status_Project.query.filter(Status_Project.project_id==self.id).first()
        if status:
            print("aaaa-->",status.status)
            j_data = json.loads(status.status)
            if 'project_stat' in j_data:
                j_data['project_stat'] = stat
            else:
                j_data['project_stat'] = stat

            status.status = json.dumps(j_data)

            # status.status = stat
            status.error = error
           # if stat == 'OK':
            self.json = data                
            print("aaa", status)
            db.session.commit()
        return None
