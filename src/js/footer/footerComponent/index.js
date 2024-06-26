import { hideElems, showElems} from "./data.js";
import { getCookieByKey } from '../cookies';
const clientsCountry = getCookieByKey(document.cookie, "clients_country");

const initialStates = {};

hideElems.forEach(array => {
    array.selectors.forEach(selectorString => {
        const selectors = document.querySelectorAll(selectorString);
        selectors.forEach(selector => {
            initialStates[selectorString] = initialStates[selectorString] || [];
            initialStates[selectorString].push(selector);
        });
    });
});

function removeElements(selectors) {
    selectors.forEach(selector => {
        if (selector && selector.parentElement) {
            selector.parentElement.removeChild(selector);
        }
    });
}

function restoreElements(selectors, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container) {
        selectors.forEach(selector => {
            if (selector) {
                container.appendChild(selector);
            }
        });
    }
}

function handleCountryChange(clientsCountry) {
    hideElems.forEach(array => {
        const shouldHide = array.id === 'hideDiel'
            ? !array.countries.includes(clientsCountry)
            : array.countries.includes(clientsCountry);

        if (!shouldHide) {
            document.querySelector('.footer_social-icons.diel').style.display = 'flex';
        }

        if (shouldHide) {
            array.selectors.forEach(selectorString => {
                removeElements(initialStates[selectorString]);
            });
        } else {
            array.selectors.forEach(selectorString => {
                restoreElements(initialStates[selectorString], 'body');
            });
        }
    });
}

handleCountryChange(clientsCountry);

showElems.forEach(array => {
    if (clientsCountry && array.countries.includes(clientsCountry)) {
        array.selectors.forEach(selectorString => {
            const selectors = document.querySelectorAll(selectorString);
            selectors.forEach(selector => {
                if (selector) {
                    if(selectorString === '.banner_disclaimer'){
                        selector.classList.remove('hide-element')
                    }
                    else {
                        selector.style.display = "block";
                    }
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
