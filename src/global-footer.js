<!-- Growthbook - start of code -->
<script async
  data-api-host="https://cdn.growthbook.io"
  data-client-key="sdk-N8YaWEHuCwhdARP"
  src="https://cdn.jsdelivr.net/npm/@growthbook/growthbook/dist/bundles/auto.min.js"
></script>
<!-- Growthbook - end of code -->


<script>
var Webflow = Webflow || []; 
Webflow.push(function() {
  
  if (document.querySelector('.new-navbar_component')) {
    
    // Find the .new-navbar_component element
    const navbarComponent = document.querySelector('.new-navbar_component');

    // Add event listeners for hover
    navbarComponent.addEventListener('mouseenter', () => {
    		if (window.innerWidth > 991) {
    			disableScroll();
			}
    });
    navbarComponent.addEventListener('mouseleave', () => {
    		if (window.innerWidth > 991) {
    			enableScroll();
			}
    });

    // Function to disable scroll
    function disableScroll() {
        document.body.classList.add('disable-scroll');
    }

    // Function to enable scroll
    function enableScroll() {
        document.body.classList.remove('disable-scroll');
    }
    
  }
    
}); 
</script>
<!-- Datadog Integration -->
<script>
(() => {
const dd_options = {
            clientToken: 'pub08554ab30284600af157441bfb0fa923',
            datacenter: '5c8975a3-ec86-4a64-8a3a-e6888fdde082',
            forwardErrorsToLogs: true,
            sampleRate: 100,
        };

        const dd_script = document.createElement('script');
        dd_script.type = 'text/javascript';
        dd_script.text = `!function(e,a,t,n,s){e=e[s]=e[s]||{q:[],onReady:function(a){e.q.push(a)}},(s=a.createElement(t)).async=1,s.src=n,(n=a.getElementsByTagName(t)[0]).parentNode.insertBefore(s,n)}(window,document,"script","https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js","DD_RUM"),window.DD_RUM.onReady(function(){window.DD_RUM.init(${JSON.stringify(
            dd_options,
        )})});`;

        document.head.appendChild(dd_script);
})()</script>
<!-- End Datadog Integration -->
<script>
  function parseCookies(cookieString) {
  const cookies = {};
  cookieString.split(';').forEach(cookie => {
    const [key, value] = cookie.split('=').map(c => c.trim());
    cookies[key] = decodeURIComponent(value);
  });
  return cookies.clients_country;
}

// Listen for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
  const clientsCountry = parseCookies(document.cookie);
  const hideElems = [
    {
      id: 'appgallery',
      selectors: ['.footer_banner-badge.gallery.w-inline-block'],
      countries: ["bt", "xk", "tv"],
    },
    {
      id: 'appstoreAndGallery',
      selectors: [
        '.footer_banner-badge.store.w-inline-block',
        '.footer_banner-badge.gallery.w-inline-block',
      ],
      countries: ["aq", "bv", "io", "cx", "cc", "cw", "fk", "tf", "gg", "hm", "im", "je", "ki", "nu", "nf", "pn", "bq", "sh", "vc", "gs", "tl", "tk", "um", "eh"],
    },
    {
      id: 'appstore',
      selectors: ['.footer_banner-badge.store.w-inline-block'],
      countries: ["ad", "bi", "cf", "ck", "gq", "et", "ls", "ps"],
    },
    {
      id: 'p2p',
      selectors: [
        '.footer_link.p2p',
        '.new-navbar_dropdown-link.p2p',
        '.new-navbar_tabs-dropdown-link.p2p',
      ],
      countries: [
        "as", "au", "at", "be", "bg", "ca", "hr", "cy", "cz", "dk", "ee", "fi", "fr", "gr", "gu", "gg", "hk", "hu", "ir", "ie", "im", "il", "it", "je", "ng", "mm", "sy", "kp", "lv", "lt", "lu", "my", "mt", "nl", "nz", "mp", "py", "pl", "pt", "pr", "ro", "rw", "sk", "si", "es", "se", "ae", "gb", "us", "um", "vu", "vi", "ky", "cu", "de"]
    },
    {
      id: 'hideFooter',
      selectors: [
        'footer.footer_component',
      ],
      countries: ["br", "uy", "lk", "ch", "za", "ec"]
    },
  ];
  
  const showElems = [
    {
        id: 'showElems',
        selectors: [
          'footer.footer_component.diel',
          '.banner_disclaimer',
        ],
        countries: ["br", "uy", "lk", "ch", "za", "ec"]
      },
  ]
console.log(clientsCountry,'www')
  hideElems.forEach(array => {
      if (clientsCountry && array.countries.includes(clientsCountry)) {
        array.selectors.forEach(selectorString => {
          const selectors = document.querySelectorAll(selectorString);
          selectors.forEach(selector => {
            if (selector) {
              selector.style.display = "none";
            }
          });
        });
      }
    });

   showElems.forEach(array => {
      if (clientsCountry && array.countries.includes(clientsCountry)) {
        array.selectors.forEach(selectorString => {
          const selectors = document.querySelectorAll(selectorString);
          selectors.forEach(selector => {
            if (selector) {
           selectorString === '.banner_disclaimer' ?  selector.classList.remove('hide-element'):  selector.style.display = "block";
            }
          });
        });
      } else {
        array.selectors.forEach(selectorString => {
          const selectors = document.querySelectorAll(selectorString);
          selectors.forEach(selector => {
            
            if (selector) {
             selectorString === '.banner_disclaimer' ?  selector.classList.add('hide-element'): selector.style.display = "none";
            }
          });
        });
      }
    });
})
</script>