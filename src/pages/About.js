import React from "react";
import Layout from "./../components/Layout/Layout";
import vdo from '../assets/video.gif'

const About = () => {
    return (
        <Layout title={"About us - Universitas Mercatus app"}>
            <div className="row about">
                <div className="col-md-7 ">
                    <img
                        src={vdo}
                        alt="contactus"
                        style={{ width: "100%" ,height:'100%'}}
                        
                    />
                </div>
                <div className="col-md-5 " >
                    <h1 className="about-head p-2 text-center my-3">What do we do?</h1>
                    <p className="text-justify mt-2 mx-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                        officiis obcaecati esse tempore unde ratione, eveniet mollitia,
                        perferendis eius temporibus dicta blanditiis doloremque explicabo
                        quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
                        accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
                        commodi illum quidem neque tempora nam.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;