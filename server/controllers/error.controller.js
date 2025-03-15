function handleError(req, res) {
  // Your code to handle the error
}
function getErrorMessage(errMsg) {
  console.log("An error occurred");
  console.log(errMsg);
}
// Export the controller function
export default {
  handleError: handleError,
  getErrorMessage: getErrorMessage,
};
