import React from 'react';
import "./Fuke.css"
class Filetxt extends React.PureComponent implements Blob {
    constructor(props) {
        super(props);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.handleFile[0]){
            this.file =  this.props.handleFile[0];
            this.name = this.file.name;
            let formDate = new window.FormData();
            formDate.append('file',this.file);
            console.log(formDate)
            this.props.handleSendFile(formDate);
        }

    }
    render() {
      return (this.props.handleFile[0] ? <div className="File_Container">
            <div className='fileName'>

            </div>
            <div className='sendFile'>

            </div>
        </div>:'')
    }
}
export default Filetxt;
