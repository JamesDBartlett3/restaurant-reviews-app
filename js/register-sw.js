/*
Simple script that registers the Service Worker,
logging any errors in doing so to the console.
*/

window.addEventListener('load', () => { // when page loads,
    if (!navigator.serviceWorker) { // if browser doesn't support serviceWorker,
        // kindly inform the user that their browser requires updating,
        console.log('Umm... Your browser is OLD. Go get a new one!');
        return // and that's all we can do for now.
    }

    // but, if serviceWorker IS supported, do the following:
    navigator.serviceWorker.register('./sw.js', { // register it
        scope: '/restaurant-reviews-app/' // set its scope to origin root
    }).then( () => { // when that's finished,
        // do nothing, for now...
    }).catch(error => { // but if an error occurs while registering,
        // log said error to the console.
        console.log('Service Worker Registration Failed. Error Message: ', error)
    })
})
