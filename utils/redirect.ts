


function Redirect(dest, premenant) {
    if (!dest) console.error('Dest cannot be ' + typeof dest);
    if (typeof premenant == null) console.error('premenant cannot be ' + typeof premenant);
  
    return {
      redirect : {
        destination: dest,
        permenant: premenant
      }
    }
  }


  export default Redirect;