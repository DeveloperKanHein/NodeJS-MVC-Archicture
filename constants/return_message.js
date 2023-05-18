class ReturnMessage
{
    static success(msg = "Process Success.")
    {
        return {
            status: "success",
            message: msg,
        };
    }

    static fail(msg = "Process Fail!")
    {
        return {
            status: "fail",
            message: msg,
        };
    }
}

module.exports = ReturnMessage;