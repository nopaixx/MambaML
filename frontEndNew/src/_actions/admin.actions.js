import { adminConstants } from '../_constants';
import { adminService } from '../_services';
import { alertActions } from './';
import { saveJSON, buildFileSelector } from './utils.global.js';

export const adminActions = {
	createBox,
	updateBox,
	restartBoxFactory,
	exportBox,
	importBox
};

function createBox(box) {
	return dispatch => {
		dispatch(request(box));

		adminService.createBox(box).then(
			box => {
				dispatch(success(box));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(box) {
		return { type: adminConstants.CREATE_BOX_REQUEST, box };
	}
	function success(box) {
		return { type: adminConstants.CREATE_BOX_SUCCESS, box };
	}
	function failure(error) {
		return { type: adminConstants.CREATE_BOX_FAILURE, error };
	}
}

function restartBoxFactory() {
	return dispatch => {
		dispatch(success());
	};
	function success() {
		return { type: adminConstants.RESTART_BOX_FACTORY_SUCCESS };
	}
}

function updateBox(box) {
	return dispatch => {
		dispatch(request(box));
		adminService.updateBox(box).then(
			box => {
				dispatch(success(box));
			},
			error => {
				dispatch(failure(error.toString()));
				dispatch(alertActions.error(error.toString()));
			}
		);
	};

	function request(box) {
		return { type: adminConstants.UPDATE_BOX_REQUEST, box };
	}
	function success(box) {
		return { type: adminConstants.UPDATE_BOX_SUCCESS, box };
	}
	function failure(error) {
		return { type: adminConstants.UPDATE_BOX_FAILURE, error };
	}
}
function exportBox(Box){

        saveJSON(JSON.stringify(Box), 'box' + Box.friendly_name + '.json');
	   	     	
//	return null
}

function importBox(){
	console.log("AL-2")
	       console.log("AL---")
                const id = 'importBoxSelector';
                const selector = buildFileSelector(id);
                selector.click();
                selector.addEventListener('change', () => uploadFile(selector.files));
		console.log("AL-import!")
                const uploadFile = files => {
                        var fr = new FileReader();
                        fr.onload = function(e) {
                                var result = JSON.parse(e.target.result);
				console.log("AL-",result.friendly_name)
			//	const box=""
                                //var chartStructure = JSON.stringify(result.data.json, null, 2);
	                        const box = {
	                                result.friendly_name,
       	                	//        result.type,
             		        //        result.frontendVersion: 'V1',
        	           	//        result.backendVersion: 'V1',
                            //		result.n_input_ports: inputPorts,
	                     //           result.n_output_ports: outputPorts,
       	                //	        result.depen_code: dependencies,
              		 //               result.python_code: code,
        	          //   	        parameters: result.parameters,
	                        };
 	        	        createBox(box);
                        };
                        fr.readAsText(files.item(0));
                };

}
