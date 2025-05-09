const Url = require("../model/url");

let shortUrl = null;

async function home(req, res) {
    res.render('home', { shortUrl });
    shortUrl = null;
}

async function createUrl(req, res) {

    const originalUrl = req.body.input;
    const isExist =await Url.findOne({originalUrl:originalUrl});

    if(isExist){
        shortUrl = isExist.shortUrl;
    }
    else{

        shortUrl = "localhost:4000/" + Math.random().toString(36).substring(2, 15);
        await Url.create({ originalUrl, shortUrl,createdBy: req.user._id });
    }
    res.redirect('/');
}

async function redirect(req,res) {

    const url = "localhost:4000/"+req.params.url;
    const data = await Url.findOneAndUpdate(
        { shortUrl: url }, 
        { $inc: { clicks: 1 } },
        { new: true } 
    );

    if (!data) {
        return res.status(404).json({ message: "URL not found" });
    }
    
    res.redirect(data.originalUrl)
}

async function MyUrls(req,res){
    
    const urls = await Url.find({createdBy: req.user._id});
    res.render('myurls', { urls });
}

module.exports={
    createUrl,
    redirect,
    home,
    MyUrls
}