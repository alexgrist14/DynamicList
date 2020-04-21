import React, {Component} from 'react';

export default class List extends Component{
    constructor(props: any){
        super(props);
        this.state = {};
        this.getList = this.getList.bind(this);
    }

    componentDidMount(){
        // this.setState((state)=>{
        //     return fetch("https://mrsoft.by/tz20/list.json");
        // });
    }

    async getList(){
        let url = "https://mrsoft.by/tz20/list.json";
        const requestOptions = {
            headers: {    
                'Access-Control-Allow-Origin': 'https://mrsoft.by/tz20/list.json' }};

        let response = await fetch(url,
            requestOptions
        );
        console.log(response.text());
    }

    render(){
        return(
            <button onClick={() => this.getList()}>click</button>
        )
    }
}