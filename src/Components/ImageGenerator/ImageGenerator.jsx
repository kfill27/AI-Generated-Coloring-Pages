import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

export const ImageGenerator = () => {
    const[image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const[loading,setLoading]=useState(false);

    const ImageGenerator = async () =>{
        if (inputRef.current.value===""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                    `Bearer ${process.env.REACT_APP_OPENAI}`,
                    "User-Agent":"Chrome"
                },
                body:JSON.stringify({
                    prompt: `Create a coloring page of ${inputRef.current.value} that's appropriate for a 5 year old`,
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }

  return (
    <div className='ai-image-generator'>
        <div className='header'>AI Generated <span>Coloring Pages</span></div>
        <div className="img-loading">
            <div className="image"><img src={image_url==="/"?default_image:image_url} alt="" /></div>
            <div className="loading">
                <div className={loading?"loading-bar-full":"loading-bar"}></div>
                <div className={loading?"loading-text":"display-none"}>Loading...</div>
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' name="" id="" />
            <div className="generate-btn" onClick={()=>{ImageGenerator()}}>Generate</div>
        </div>
    </div>
  )
}
