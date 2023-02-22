export const api = (() => {
  const loginRequest = async (loginData) => {
    console.log(`[api]: starting request API ${process.env.api_server}`);
    const request = await fetch(process.env.api_server, loginData);
    const response = await request.json();
    console.log(
      `[server]: response API ${process.env.api_server} with data:`,
      response
    );
    return response;
  };

  return {
    loginRequest,
  };
})();
