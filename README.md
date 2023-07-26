# REVIF - Art Commission Site
## Introduction
This project is a part of **ITCS212 Introduction to Web Programming** course at MUICT.
See the project repository on [GitHub](https://github.com/pmwatt/muict-webprog.git).

This project was inspired from sites such as [Fiverr](https://www.fiverr.com/) and [DeviantArt](https://www.deviantart.com/).

![image](https://github.com/pmwatt/muict-revif/assets/87473156/d6a1bf3f-c015-4dbb-be23-eaa20593eff4)
![image](https://github.com/pmwatt/muict-revif/assets/87473156/9262116b-3289-4bde-80d2-03ec12c2ae72)
![image](https://github.com/pmwatt/muict-revif/assets/87473156/49944dcd-1b4a-408e-af0f-c349b1230ae2)


## Group Members
6488035	Teerut	Krachangpoj<br>
6488125	Phutthikanj	Kitivoranondh<br>
6488160	Prachnachai	Meakpaiboonwattana <br>
6488162	Thachchai	Pattamasrirattana<br>
6488221	Thai	Mekractanavorakul<br>

## Remarks
### How to run/start web application
1. Extract the project ZIP file. You should see 2 folders named `sec2_gr4_ws_src` and `sec2_gr4_src`, as well as `sec2_gr4_database.sql`.
2. Navigate to two of the directories using separated terminals: `sec2_gr4_ws_src` and `sec2_gr4_src`. Briefly, `sec2_gr4_src` is dedicated to routing pages path and fetching, whereas `sec2_gr4_ws_src` is dedicated to running backend web services such as INSERT/UPDATE/DELETE/ETC.
3. Install dependencies in both directories.
4. Use MySQL workbench to run `sec2_gr4_database.sql` (located in the root). This will create database and tables with starter records.
5. Set up MySQL workbench user privileges for SELECT/INSERT/UPDATE/DELETE as the following
   1. Toolbar > Server > User and Privileges > Add Account
   2. Set up **Login Name** and **Password**, and copy them into both of the project folder's `.env`'s `MYSQL_USERNAME` and `MYSQL_PASSWORD`
   3. Schema Privileges > Add Entry... > Select schema `revif` > OK
   4. Object Rights > toggle SELECT, INSERT, UPDATE, DELETE
   5. Apply
6. Run `npm start` inside `sec2_gr4_src` directory to run nodemon for the pages web server. This web server's PORT should be `3030`.
7. Run `npm start` inside `sec2_gr4_ws_src` directory to run backend web server containing web services such as insert/select/delete/update (and login too). This web server's PORT should be `3000`.
8. Open web browser, and type `localhost:3030` into the search bar to open the home page (`index.html`) by routing to `/`.

### Content in Brief

1. Home Page (`index.html`)
   1. The following CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `index.css`
   2. This page uses 3rd Party api to generate quotes related to art. See [their website](https://api-ninjas.com/api/quotes) for more details.
2. Login Page (`login-admin.html`)
   1. The following CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `login-admin.css`
   2. This serves as a gateway login page for administrator. After authentication, the admin would be able to search/add/remove/modify user and commission information.
   3. This page verifies authentication using GET request.
   4. It might not be the best or the most secured solution as username and password are passed directly in the URL in the fetch request.
3. Search Page (`search.html`)
   1. The following CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `search.css`
   2. This serves as a page for user to call commission search web service using 3 criteria.
4. Commission Service Management (`commission-management-admin.html`)
   1. The following CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `commission-service-management-admin.css`
   2. The following animation js are applied:
      1. `toggle-admin-menu.js` to switch between SEARCH/ADD/REMOVE/MODIFY tabs.
   3. This serves as a management page for admin to add/remove/modify commission data.
5. User Account Management (`admin-management-admin.html`)
   1. The following CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `user-service-management-admin.css`
   2. The following animation js are applied:
      1. `toggle-admin-menu.js` to switch between SEARCH/ADD/REMOVE/MODIFY tabs.
   3. This serves as a management page for admin to add/remove/modify user data.
6. About Us (`about-us.html`)
   1. The following CSS are applied:
      1. `navbars.css`
      2. `global.css`
      3. `header-footer.css`
      4. `about-us.css`
   2. This page lists dummy details for our members. Obviously, the titles are for decorative purposes.

### Cautions

- Most of the pages have been implemented so that they can be viewed on mobile. However, this is not guaranteed to apply for all pages. We have tested on the default Laptop screen, iPhone XR and iPhone 5/SE screen.
- Some web services did not check for duplicates automatically. They may fail due to duplicated entries or some fields being forced to be unique.
- This includes admin's `email` and `username`, as well as commission's `commission_id`. See `sec2_gr4_database.sql` to check their requirements.

### References

- Images were used from [Unsplash](www.unsplash.com) for academic purposes, as stated on their website.

> Unsplash grants you an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. This license does not include the right to compile photos from Unsplash to replicate a similar or competing service.

- Third party quotes API, see their [site](https://api-ninjas.com/api/quotes) for more details.
