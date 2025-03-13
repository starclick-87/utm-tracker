(function() {
    console.log("🔄 Début du script de redirection sur la Page Agenda...");

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    let utmString = "";
    let hasUTM = utmParams.some(param => urlParams.has(param));

    console.log("🔍 Vérification des UTM dans l'URL :", window.location.href);
    console.log("👉 UTM déjà présentes dans l'URL ?", hasUTM);

    function getCookie(name) {
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }

    console.log("🔍 Vérification des UTM dans les cookies et localStorage...");
    utmParams.forEach(param => {
        let storedValue = localStorage.getItem(param) || getCookie(param);
        if (storedValue) {
            console.log(`✅ UTM trouvée : ${param} = ${storedValue}`);
            utmString += `${param}=${storedValue}&`;
        } else {
            console.log(`⚠️ UTM absente : ${param}`);
        }
    });

    let newUrl = window.location.origin + window.location.pathname + "?" + utmString.slice(0, -1);
    console.log("👉 Nouvelle URL avec UTM :", newUrl);
    console.log("👉 UTM String générée :", utmString);

    if (!hasUTM && utmString !== "") {
        console.log("✅ Condition remplie : Aucune UTM dans l'URL et UTM trouvées en cookies -> Redirection");
        alert("🔄 Redirection en cours vers : " + newUrl);
        
        setTimeout(() => {
            window.location.href = newUrl;
        }, 1000);
    } else {
        console.log("❌ Condition NON remplie : Soit les UTM sont déjà dans l'URL, soit elles ne sont pas trouvées en cookies.");
    }
})();
