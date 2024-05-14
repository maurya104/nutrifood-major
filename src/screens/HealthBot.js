import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export class HealthBot extends Component {
    render() {

        const centeredDivStyle = {
            // position: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(0%, 0%)',
            border: '1px solid #000',
            padding: '20px',
            backgroundColor: "blue"
        };

        const containerStyle = {
            color:'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Adjust as needed
            backgroundColor: '#f0f0f0'
        };
        return (

            <>

            <div>
                <Navbar/>
            </div>
                <div style={containerStyle}>

                    <iframe style={{color:"black"}} width="900" height="600" allow="microphone;"
                        src="https://console.dialogflow.com/api-client/demo/embedded/62333dab-ce90-46c0-922a-f853a5fa44d4"></iframe>

                </div>
                
            </>
        )
    }
}

export default HealthBot