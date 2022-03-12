#!/usr/bin/env node
const program  = require('commander');
const fs = require('fs')
const util = require('util')
const stream = require('stream')
const es = require('event-stream');
var path = require('path')

program 
    .version('Version : 1.0.0')
    .description('Welcome to mytools 1.0.0')
program
    .enablePositionalOptions()
    .option('-t',' <file> -t <json/text> retrieve log files output default .txt')
    .option('-o',' <file from> -o <file to> save the file in the desired location')
    .argument('<from>')
    .argument('[to]')
    .action((from,to)=>{
        if (to==undefined && program.opts().t ==undefined && program.opts().o ==undefined){
            optionsT(from,"")
        }
        else{
            logProgramOptions(program,from,to);
        }
    })

const logProgramOptions = (prog,from,to) => {
    const options = prog.opts();
    if (options) {
        if (options.o==true){
            optionsO(from,to)
        }
        else if(options.t==true){
            optionsT(from,to)
        }
    }
    else {
        console.log('no options');
    }
}

const optionsT = (file,type)=>{    
    if (file==undefined){
        console.log("File Empty");
    }
    else{
        try{
            filename =(file.split(/[\\/]/).pop().replace(/\.[^/.]+$/, ""));
            fs.readFile(file, 'utf8' , (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                    if (type=="json"){
                        fs.writeFile(filename+".json", JSON.stringify(data) , err => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            else{
                                console.log('finish !')
                            }
                        })                        
                    }
                    else{
                        fs.writeFile( filename+".txt",data, err => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            else{
                                console.log('finish !')
                            }
                        })
                    }
            })
        }catch (e){
            console.log(e)
        }            
    }
}

const optionsO = (filefrom,fileto)=>{
    if (filefrom==undefined){
        console.log("File From Empty");
    }
    else if(fileto==undefined){
        console.log("File To Empty");
    }
    else{
        try{
            fs.readFile(filefrom, 'utf8' , (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                else{
                    if (path.extname(fileto)==".json"){
                        fs.writeFile(fileto,JSON.stringify(data), err => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            else{
                                console.log('finish !')
                            }
                        })
                    }
                    else{
                        fs.writeFile(fileto,data, err => {
                            if (err) {
                                console.error(err)
                                return
                            }
                            else{
                                console.log('finish !')
                            }
                        })
                    }
                }
            })
        }
        catch(e){
            console.log(e)
        }
    
    } 
    
}

program.parse(process.argv);