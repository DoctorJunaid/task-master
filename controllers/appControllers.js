
const dashboardController = (req , res) => {
        // session details add later
        res.render('layout' , {
            pageTitle: 'Dashboard',
            // user: req.session.user || null,
            view : 'dashboard'
        });
};

const loginController = (req , res) => {
    res.render('layout' , {
        pageTitle: 'Login' ,
        view : 'auth',
        mode : 'login'
    });
};

const signupController = (req , res) => {
    res.render('layout' , {
        pageTitle: 'Signup' ,
        view : 'auth',
        mode : 'signup'
    });
};

const unexpectedRouteController = (req , res) => {
    res.render('layout' , {
        pageTitle: 'Page Not Found' ,
        view : '404'
    });
};

module.exports = {
    dashboardController ,
    loginController ,
    signupController ,
    unexpectedRouteController
}