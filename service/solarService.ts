
export async function fetchProvidersService() {
    try {
    //   const providers = await fetchProvidersModel();
    //   return providers;
    } catch(error) {
      console.log("Error fetching providers: ", error)
      return {message: "Something went wrong! Please try again later."}
    }
  } 
  