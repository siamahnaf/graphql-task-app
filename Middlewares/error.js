module.exports = (err, req, res, next) => {
    throw new Error("Something Went Wrong!!!");
    console.log(err);
}