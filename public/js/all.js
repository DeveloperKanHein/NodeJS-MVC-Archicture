    // sidebar toggle 
let menuOpen = document.querySelector('.menu-icon'),
    sidebar = document.querySelector('.sidebar'),
    menuClose = document.querySelector('.menu-close');

menuOpen.addEventListener('click', () =>{
    sidebar.classList.remove('d-none');
})

menuClose.addEventListener('click', () =>{
    sidebar.classList.add('d-none');
})
    
    // for dashboard 
let dashboardOpen = document.querySelector('#dashboard_open'),
    dashboardClose = document.querySelector('#dashboard_close'),
    home = document.querySelector('#home'),
    // for course 
    courseOpen = document.querySelector('#course_open'),
    courseClose = document.querySelector('#course_close'),
    course = document.querySelector('#courses'),
    // for orders
    orderOpen = document.querySelector('#order_open'),
    orderClose = document.querySelector('#order_close'),
    order = document.querySelector('#order'),
    // for setting
    settingOpen = document.querySelector('#setting_open'),
    settingClose = document.querySelector('#setting_close'),
    setting = document.querySelector('#setting'),
    // for user
    userOpen = document.querySelector('#user_open'),
    userClose = document.querySelector('#user_close'),
    user = document.querySelector('#user'),
    // for report
    // reportOpen = document.querySelector('#report_open'),
    // reportClose = document.querySelector('#report_close'),
    report = document.querySelector('#report'),
    // for role
    // roleOpen = document.querySelector('#role_open'),
    // roleClose = document.querySelector('#role_close'),
    role = document.querySelector('#role');

function toggle (open,close,content) {
    open.classList.toggle('d-none');
    close.classList.toggle('d-none');
    content.classList.toggle('d-none');
}

// for dashboard 
dashboardOpen.addEventListener('click',() => {
    toggle(dashboardOpen,dashboardClose,home)
})

dashboardClose.addEventListener('click',() => {
    toggle(dashboardOpen,dashboardClose,home)
})

// for course 
courseOpen.addEventListener('click',() => {
    toggle(courseOpen,courseClose,course)
})

courseClose.addEventListener('click',() => {
    toggle(courseOpen,courseClose,course)
})

// for order 
orderOpen.addEventListener('click',() => {
    toggle(orderOpen,orderClose,order)
})

orderClose.addEventListener('click',() => {
    toggle(orderOpen,orderClose,order)
})

// for setting 
settingOpen.addEventListener('click',() => {
    toggle(settingOpen,settingClose,setting)
})

settingClose.addEventListener('click',() => {
    toggle(settingOpen,settingClose,setting)
})

// for user 
userOpen.addEventListener('click',() => {
    toggle(userOpen,userClose,user)
})

userClose.addEventListener('click',() => {
    toggle(userOpen,userClose,user)
})

// for report 
// reportOpen.addEventListener('click',() => {
//     toggle(reportOpen,reportClose,report)
// })

// reportClose.addEventListener('click',() => {
//     toggle(reportOpen,reportClose,report)
// })

// for role 
// roleOpen.addEventListener('click',() => {
//     toggle(roleOpen,roleClose,role)
// })

// roleClose.addEventListener('click',() => {
//     toggle(roleOpen,roleClose,role)
// })

// for loading 
function showLoading(){
    let up = document.querySelector('#upload_form');
    let loader = document.querySelector('#loader_box');
    loader.classList.remove('hide-loading')
    // up.addEventListener('click',() => loader.classList.remove('hide-loading'))
}