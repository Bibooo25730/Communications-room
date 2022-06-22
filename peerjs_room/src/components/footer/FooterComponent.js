import react from 'react';
import './footer.css'
class FooterComponent extends react.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (<footer>Made with <span style={{color:'red'}}>❤</span>  by P2Chat © 2022  Powered by  <a href="https://www.bibooo.top/">Bibooo</a> </footer>)
    }
}

export  default  FooterComponent;
