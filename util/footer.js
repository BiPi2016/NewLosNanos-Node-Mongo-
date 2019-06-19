const topFooterNames = ['support', 'sitemap', 'follow us', 'about us', 'secure payments provided by'];
const supportNames =  ['FAQ', 'Chat', 'contact us', 'E-mail', 'Telephone'];
const supportInfo = [null, null, null, 'bp.singh@hotmail.com', '0738957790'];
const supportLinks = ['/faq', '/chat', '/contactus', null, 'tel:+46738957790'];
const  siteMapNames = ['sizeguide', 'deliveries', 'returns', 'availability', 'complaints'];
const siteMapLinks = ['/sizeguide', 'deliveries', 'returns', '/availability', '/complaints'];
const followUsNames = ['instagram', 'facebook', 'pinterest', 'twitter'];
const followUsLinks = ['https://www.instagram.com/', 'https://www.facebook.com/', 'https://www.pinterest.se/', 'https://twitter.com/'];
const followUsImages = ['<i class="fab fa-instagram"></i>', '<i class="fab fa-facebook-square"></i>', '<i class="fab fa-pinterest-square"></i>', '<i class="fab fa-twitter-square"></i></i>'];
const aboutUsNames = ['los nanos', 'our mission', 'careers', 'press releases'];
const aboutUsLinks = ['/losnanos', '/ourmission', '/careers', '/pressreleases'];

const paymentPartnersNames = ['mastercard', 'visa', 'klarna', 'paypal'];
const PaymentPartnersImageUrls = ['mastercard.png', 'visa.png', 'klarna.png', 'paypal.png' ]

const supportMenu = supportNames.map( (s, index) => {
    return {
        name: s,
        endPoint: supportLinks[index],
        label: supportInfo[index]
    }
});
const siteMapMenu = siteMapNames.map( (sM, index) => {
    return {
        name: sM,
        endPoint: siteMapLinks[index]
    }
});
const followUsMenu = followUsNames.map( (f, index) => {
    return {
        name: f,
        endPoint: followUsLinks[index],
        image: followUsImages[index]
    }
});
const aboutUsMenu = aboutUsNames.map( (a, index) => {
    return {
        name: a,
        endPoint: aboutUsLinks[index]
    }
});
const paymentPartnerMenu = paymentPartnersNames.map( (p, index) => {
    return {
        name: p,
        imgUrl: PaymentPartnersImageUrls[index]
    }
});

const footerMenus = [supportMenu, siteMapMenu, followUsMenu, aboutUsMenu, paymentPartnerMenu];

const topFooterList = topFooterNames.map( (n, index) => {
    return {
        name: n,
        menu: footerMenus[index]
    }
});

module.exports = topFooterList;