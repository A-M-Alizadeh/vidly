const log = (req, resp, next)=>{
    console.log('logging enabled...');
    next();
}
module.exports = log;