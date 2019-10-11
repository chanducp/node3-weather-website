
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//Define paths for express config
const publicDirPath=path.join(__dirname,'../public')
const viewsDirPath=path.join(__dirname,'../templates/views')
const partialsDirPath=path.join(__dirname,'../templates/partials')

const port =process.env.PORT||3000
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsDirPath)
hbs.registerPartials(partialsDirPath)

//Setup static directory to serve
 app.use(express.static(publicDirPath))

// const address=process.argv[2];

app.get('',(req,res)=>{

        res.render('index',{
            title:'Weather',
            name:'Andrew Mead'
        })
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About me',
        name:'Andrew Mead'
    })
})

app.get('/help',(req,res)=>{

    res.render('help',{
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Andrew Mead'
    })
})

app.get('/weather',(req,res)=>{
    // const address=req.query.address
    
    console.log(req.query)

    if(!req.query.address){
       return res.send({
            error:'Provide an address'
        })
        
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude,longitude,(error,{forecastData}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecastData,
                location,
                adress:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'Provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'Help article not found',
        name:'Andrew Mead'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'Page not found',
        name:'Andrew Mead'
    })
})

app.listen(port,()=>{

    console.log('Server is up and running');
    
})
