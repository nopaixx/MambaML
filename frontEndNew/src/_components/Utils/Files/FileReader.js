import { buildFileSelector } from '../_actions/utils.global'



class FileDialogue extends React.Component {
  componentDidMount(){
    this.fileSelector = buildFileSelector();
  }
  
  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();
  }
  
  render(){
    return <a className="button" href="" onClick={this.handleFileSelect}>Select files</a>
  }
}

export FileDialogue;
