import { useState } from 'react'
import {imageTarget} from 'mind-ar-ts'
export default function Compiler() {
    const [form, setform] = useState();
    const { Compiler } = imageTarget
    const compiler = new window.MINDAR.IMAGE.Compiler();
    
    // const loadImage = async (file) => {
    //     const img = new Image();

    //     return new Promise((resolve, reject) => {
    //       let img = new Image()
    //       img.onload = () => resolve(img);
    //       img.onerror = reject;
    //       if(file){}
    //       img.src = URL.createObjectURL(file);
    //     })
    // }
    const compileFiles = async (files) => {
        const images = [];
        for (let i = 0; i < files.length; i++) {
            images.push(URL.createObjectURL(new Blob([files[i]])));
        }
        let _start = new Date().getTime();
        const dataList = await compiler.compileImageTargets(images, (progress) => {
            document.getElementById("progress").innerHTML = 'progress: ' + progress.toFixed(2) + "%";
        });
        console.log('exec time compile: ', new Date().getTime() - _start);
        for (let i = 0; i < dataList.length; i++) {
            showData(dataList[i]);
        }
        const exportedBuffer = await compiler.exportData();
        document.getElementById("downloadButton").addEventListener("click", function () {
            download(exportedBuffer);
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const files = form;
            console.log(files);
            if (files.length === 0) return;
            const compiler = new Compiler();
            compiler.compileImageTargets(form[0])
            // compileFiles(files);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="" id="" onChange={(e) => { setform(e.target.value) }} />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}
