# REVIF - Art Commission Site
## Introduction
This project is a part of **ITCS212 Introduction to Web Programming** course at MUICT.
See the project repository on [GitHub](https://github.com/pmwatt/muict-webprog.git) and live preview on [GitHub Pages](https://pmwatt.github.io/muict-revif/).

This project was inspired from sites such as [Fiverr](https://www.fiverr.com/) and [Deviant](https://www.deviantart.com/).

## Group Members
6488035	Teerut	Krachangpoj<br>
6488125	Phutthikanj	Kitivoranondh<br>
6488160	Prachnachai	Meakpaiboonwattana <br>
6488162	Thachchai	Pattamasrirattana<br>
6488221	Thai	Mekractanavorakul<br>

## Remarks
### How to run/start web application
1. Extract the project ZIP file.
2. Open the `index.html` file in the root folder of the extracted project folder to open the home page.

### Content in Brief
1. Home Page (`index.html`)
   1. The followwing CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `index.css`
   2. This page serves as the first landing hub for users, showing occassional updates and user reviews.
2. Login Page (`login-admin.html`)
   1. The followwing CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `login-admin.css`
   2. This serves as a gateway login page for administrator. After authentication, the admin would be able to add/remove/modify user and commission information.
3. Search Page (`search.html`)
   1. The followwing CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `search.css`
   2. This serves as a page for user to search for commissions. As of the current version (Phase 1, 03/03/23), the search functionality purely returns every detail pages' information, and serves as a hub for the detail pages.
4. Detail Page (`detail1.html`, `detail2.html`, `detail3.html`, `detail4.html`, `detail5.html`)
   1. The followwing CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `details.css
   2. This serves as a detail page listing user's commission details, artist details, as well as contact details for commissions. The navigation bar in these pages should return user back to the previous search page result.
5. Commission Service Management (`commission-service-management-admin.html`)
   1. The followwing CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `commission-service-management-admin.css`
   2. This serves as a management page for admin to add/remove/modify commission data. For removal/modification, admin need to search whether the Commission ID (a composite key of User ID and commission number) exists, if it exists then admin can proceed to confirm/modify. The search functionality hasn't been implemented yet, so the search simply returns a dummy query result and show UI for removal/modification.
6. User Account Management (`user-account-management-admin.html`)
   1. The followwing CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `user-service-management-admin.css`
   2. This serves as a management page for admin to add/remove/modify user data. For removal/modification, admin need to search whether the user ID exists, if it exists then admin can proceed to confirm/modify. The search functionality hasn't been implemented yet, so the search simply returns a dummy query result and show UI for removal/modification.
7. About Us (`about-us.html`)
   1. The followwing CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `about-us.css`
   2. This page lists dummy details for our members. Obviously, the titles are for decorative purposes.

### Cautions
- Most of the pages have been implemented so that they can be viewed on mobile. However, this is not guaranteed to apply for all pages. We have tested on the default Laptop screen, iPhone XR and iPhone 5/SE screen.

### References
- Images were used from [Unsplash](www.unsplash.com) for academic purposes, as stated on their website.

> Unsplash grants you an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. This license does not include the right to compile photos from Unsplash to replicate a similar or competing service.

