import React from 'react';
import { Link } from 'react-router-dom'


const Home = ({ username }) => {

    return <>
        <div className='content'>
            {
                username ? <h3>
                    You are logged in as {username}
                </h3> : <>
                            <h3>Please log in to your profile, or register a new profile using the links above.</h3>
        
                        </>
            }
        </div>
    </>
}

export default Home;