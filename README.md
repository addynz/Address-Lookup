# Address lookup and verification made easy

https://www.addysolution.com/

Create a delightful user experience and remove friction from your online forms, save customers time and increase your conversion rates.  

Addresses are standardised at the point of capture, validated against official data sources including the New Zealand Postal Address File (PAF) and Land Information New Zealand (LINZ) database.

Avoid the unnecessary costs of failed deliveries, improve shipping efficiency and ensure parcels arrive first time.

![Addy Address Autocomplete](https://github.com/addynz/Address-Lookup/blob/master/img/addresslookup.png)

Addy's address lookup use intelligent fuzzy matching for searching. This means that if a typo, invalid suburb or partially correct address is entered, customers can still find the right delivery or billing address.

## Get Started

Create a free account <https://www.addysolutions.com/signup> to get an API key.

1) Include addycomplete.min.css in your page, via the usual tags:

```html
<link rel="stylesheet" href="addy.min.css" />
```

2) Include addy.min.js at the bottom of the page, before closing the body tag:

```html
<script src="addy.min.js?nzKey=YOUR-ADDY-KEY&country=nz&callback=initAddy" async defer></script>
```
Replace YOUR-ADDY-KEY with your own Addy API Key. (for AU country, use 'auKey' instead 'nzKey' and 'country=au')

Define the fields and options that will be called by the initAddy callback function once the script has loaded.

```javascript
function initAddy() {
    var addyComplete = new AddyComplete(document.getElementById("address1"));
    addyComplete.fields = {
        address1: document.getElementById("address1"),
        address2: document.getElementById("address2"),
        suburb: document.getElementById("suburb"),
        city: document.getElementById("city"),
        postcode: document.getElementById("postcode")
    }
}
```

Live demo and documentation: <https://www.addysolutions.com/services/address-validation-javascript>

## Prices

Visit the pricing page for more information and to find a plan that works for your business (https://www.addysolutions.com/pricing).

## Links

Official Addy site: <https://www.addysolutions.com/>

NZ Address Finder and Postcode API Documentation: <https://www.addysolutions.com/documentation>

All Documentation: <https://www.addysolutions.com/documentation>

Frequently Asked Questions: <https://www.addysolutions.com/faqs>

## License

The Address Checker code is released under the MIT License.

The reqwest library included in the bundle is released under the MIT License <https://github.com/LeaVerou/awesomplete>.

The Neat Complete library included in the bundle is released under the GNU Affero General Public License <https://github.com/AbleTech/neat-complete>.
