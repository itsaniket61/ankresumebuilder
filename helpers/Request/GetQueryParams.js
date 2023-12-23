import CustomLogger from "../Log/CustomLogger";

export default function getQueryParams(request) {
    // Split the query string into key-value pairs
    const params = request.nextUrl.searchParams.toString();
    const logger = new CustomLogger();
    logger.debug(`Search params are : ${params}`);
    var pairs = params.split('&');
  
    // Initialize an empty object to store the key-value pairs
    var result = {};
  
    // Iterate through each pair and add it to the result object
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1] || ''); // If value is undefined, set it to an empty string
      result[key] = value.replace("+"," ");
    }
    return result;
}