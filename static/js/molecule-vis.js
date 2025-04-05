document.addEventListener('DOMContentLoaded', function() {
    let element = document.getElementById('container-vis');
    let config = { backgroundColor: 'white' };
    let viewer = new $3Dmol.createViewer(element, config);
    let pdbUri = null;

    // Add event listener for submit button
    document.querySelector('.btn-primary').addEventListener('click', function() {
        pdbUri = document.querySelector('.form-control').value;
        console.log('PDB URI:', pdbUri);

        jQuery.ajax( pdbUri, { 
            success: function(data) {
              let v = viewer;
              v.addModel( data, "pdb" );                       /* load data */
              v.setStyle({}, {cartoon: {color: 'spectrum'}});  /* style all atoms */
              v.zoomTo();                                      /* set camera */
              v.render();                                      /* render scene */
              v.zoom(1.2, 1000);                               /* slight zoom */
            },
            error: function(hdr, status, err) {
              console.error( "Failed to load PDB " + pdbUri + ": " + err );
            },
          });
    });
});
