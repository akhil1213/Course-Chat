(this.webpackJsonpcourse_chat=this.webpackJsonpcourse_chat||[]).push([[0],{145:function(e,t,a){e.exports=a.p+"static/media/suite.ccd7235f.png"},146:function(e,t,a){e.exports=a.p+"static/media/blm.9f5f0d56.jpeg"},148:function(e,t){},151:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAExJREFUCB1jbPh/le3lx5tNDIwMcQwg8J9hkTi/eh0LWJCBoRwoAAPlQDEGJrhKmDCIBupmQuYjs5lAZiILgNlAMRaQRSAz4UZCLQcAIwYaiAejKoYAAAAASUVORK5CYII="},168:function(e,t,a){e.exports=a(273)},173:function(e,t,a){},174:function(e,t,a){},230:function(e,t){},265:function(e,t,a){},266:function(e,t,a){},267:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHBJREFUGBmNkAEKwCAMA2VfGP2mrx3sOV2us6IymIXQGlNTW9zdhCqcZQm4dmelFUp+CZZa6sYpeUVIFyIixMqjCO51Wy5unQExuYSbSF5JASLqPsqRM21lOoWc89tagr3PSMgOiWlwnUeXWA/E78IfuAX270S3ydAAAAAASUVORK5CYII="},268:function(e,t,a){},269:function(e,t,a){},270:function(e,t,a){},271:function(e,t,a){},272:function(e,t,a){},273:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(11),o=a.n(r),l=(a(173),a(25)),c=a(19),i=a(29),u=a(28),m=(a(174),a(8)),d=a(14),p=a(315),g=a(310),h=a(313),f=a(276),E=a(314),b=a(275),v=Object(g.a)({focused:{backgroundColor:"gray"},paper:{marginTop:"4%",textAlign:"center",whiteSpace:"nowrap"},textcenter:{textAlign:"center"}});function O(e){var t=v();return s.a.createElement("div",{className:"App"},s.a.createElement(b.a,{className:t.paper},s.a.createElement(h.a,null,e.classes.map((function(a,n){return s.a.createElement(f.a,{onClick:function(){return e.setFocusedClass(a.courseName)},key:n,className:e.focusedClass==a.courseName?t.focused:"unfocused"},s.a.createElement(E.a,{primary:a.courseName,className:t.textcenter}))})))))}var C=a(329);function S(e){return s.a.createElement("div",{className:"App"},s.a.createElement("div",null,"feed for class ",e.focusedClass),s.a.createElement(C.a,{id:"outlined-multiline-static",multiline:!0,fullWidth:!0,placeholder:"Add a post for ".concat(e.focusedClass),rows:4,defaultValue:"",variant:"outlined"}))}var y=a(316),j=Object(g.a)({spaceFromLeft:{marginLeft:"5%"}});var N=Object(d.b)((function(e){return{userData:e.logged.user,classes:e.classes.currentClasses}}),null)((function(e){var t=j(),a=Object(n.useState)(""),r=Object(m.a)(a,2),o=r[0],l=r[1];return Object(n.useEffect)((function(){null==e.userData&&e.history.push("/login")})),s.a.createElement("div",{className:t.spaceFromLeft},s.a.createElement(p.a,{container:!0,spacing:3},s.a.createElement(p.a,{item:!0,xs:3},s.a.createElement(O,{focusedClass:o,classes:e.classes,setFocusedClass:l})),s.a.createElement(p.a,{item:!0,xs:6},s.a.createElement(S,{focusedClass:o}))),s.a.createElement(y.a,{orientation:"vertical"}))})),A=a(16),x=a(54),M=a(317),I=a(318),k=a(20),w=a.n(k),T=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:"GET_ERRORS",payload:{msg:e,status:t,id:a}}},L=(a(195),a(96)),_=a.n(L),R=a(9),D=a(143),U="https://coursechat2.herokuapp.com/";function G(e){e.sort((function(e,t){var a=e.username.toUpperCase(),n=t.username.toUpperCase();return a<n?-1:a>n?1:0})),console.log(e);for(var t=0,a=1;a<e.length;a++)e[a].username!=e[t].username&&(e[++t]=e[a]);for(;t+1<e.length;)e.splice(t+1);return console.log(e),e}var F=function(e,t,a,n){var s=JSON.stringify({username:a,password:n});w.a.post("".concat(U,"users/login"),s,{headers:{"Content-Type":"application/json"}}).then((function(n){e({type:"LOGIN_SUCCESS",payload:n.data}),function(e,t){var a=W();console.log(a),console.log(U),w.a.get("".concat(U,"classes/").concat(t),a).then(function(){var n=Object(D.a)(_.a.mark((function n(s){var r,o,l;return _.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:for(console.log(s),e({type:"GET_CLASSES_FROM_DB",payload:s.data}),r=s.data,o=[],l=0;l<r.length;l++)o.push(w.a.get("".concat(U,"classes/course/")+r[l]._id,a).then((function(e){return console.log(e),e.data})).catch((function(e){console.log(e)})));Promise.all(o).then((function(a){var n,s=(n=[]).concat.apply(n,Object(R.a)(a));s=(s=G(s)).filter((function(e){return e.username!=t})),e({type:"SET_STUDENTS",payload:s})}));case 6:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(e){console.log(e)}))}(e,a),e({type:"SIGN_IN"}),B(e,t)})).catch((function(t){console.log(t.response),e(T(t.response.data.message,t.response.status,"LOGIN_FAIL")),e({type:"LOGIN_FAIL"})}))},B=function(e,t){var a=W();w.a.get("".concat(U,"users/get/user"),a).then((function(a){console.log(a.data),e({type:"USER_LOADED",payload:a.data}),t.push("/")})).catch((function(t){console.log(t),e({type:"AUTH_ERROR",payload:t})}))},W=function(){var e=localStorage.getItem("token");console.log(e);var t={headers:{"Content-type":"application/json"}};return e&&(console.log(e),t.headers["x-auth-token"]=e),t},P=a(18),Q={loggedIn:!1,classes:[],token:localStorage.getItem("token"),isLoading:!1,user:null},J=Object(g.a)((function(e){return{container:{display:"flex",flexDirection:"column",alignItems:"center"},width:{width:"30%"},button:{background:"#35578f",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px #33435e",color:"white",marginTop:10,height:"50px",textDecoration:"none",display:"block",textAlign:"center","&:hover":{background:"#33435e"}},buttonText:{textDecoration:"none"},textfield:{marginTop:20},header:{marginTop:60}}}));var Y=Object(d.b)((function(e){return console.log(e),{isLogged:e.logged.loggedIn,errorMsg:e.error.msg.msg,isLoading:e.logged.isLoading}}),(function(e){return{register:function(t,a,n,s,r,o){!function(e,t,a,n,s,r,o){var l=JSON.stringify({fullName:a,email:n,username:s,password:r,college:o});w.a.post("".concat(U,"users/signup"),l,{headers:{"Content-Type":"application/json"}}).then((function(a){console.log(a.data);a.data.token;e({type:"REGISTER_SUCCESS",payload:a.data[0]}),e({type:"SIGN_IN"}),B(e,t)})).catch((function(t){e(T(t.response.data,t.response.status,"REGISTER_FAIL")),e({type:"REGISTER_FAIL"}),console.log(t.response.data.message)}))}(e,t,a,n,s,r,o)}}}))((function(e){var t=J(),a=Object(n.useState)(""),r=Object(m.a)(a,2),o=r[0],l=r[1],c=Object(n.useState)(""),i=Object(m.a)(c,2),u=i[0],p=i[1],g=Object(n.useState)(""),h=Object(m.a)(g,2),f=h[0],E=h[1],b=Object(n.useState)(""),v=Object(m.a)(b,2),O=v[0],S=v[1],y=Object(n.useState)(""),j=Object(m.a)(y,2),N=j[0],k=j[1],w=Object(n.useState)(""),T=Object(m.a)(w,2),L=T[0],_=T[1],R=Object(n.useState)(""),D=Object(m.a)(R,2),U=D[0],G=D[1],F=Object(n.useState)(""),B=Object(m.a)(F,2),W=B[0],P=B[1],Q=Object(n.useState)(""),Y=Object(m.a)(Q,2),q=Y[0],K=Y[1],H=Object(n.useState)(""),V=Object(m.a)(H,2),z=V[0],Z=V[1],X=Object(n.useState)(!1),$=Object(m.a)(X,2),ee=($[0],$[1]),te=Object(n.useState)(!1),ae=Object(m.a)(te,2);function ne(){var e=new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);return console.log(e.test(f)),e.test(f)}return ae[0],ae[1],Object(d.c)(),s.a.createElement("div",{className:t.container},s.a.createElement(x.a,{className:t.header,variant:"h4"},"Make the most of your Academic life"),s.a.createElement("div",{className:t.width},s.a.createElement("p",null,e.errorMsg),s.a.createElement(C.a,{placeholder:"full name",name:"fullname",className:t.textfield,error:L.length>0,label:"Full Name*",id:"standard-error-helper-text",helperText:L,type:"text",variant:"outlined",fullWidth:!0,onChange:function(e){p(e.target.value)}}),s.a.createElement(C.a,{label:"email",name:"email",className:t.textfield,type:"email",placeholder:"E-mail",variant:"outlined",fullWidth:!0,onChange:function(e){E(e.target.value)}}),"email is empty"===W&&s.a.createElement("div",{id:"errorlabel"},W),"Invalid email format"===W&&s.a.createElement("div",{id:"errorlabel"},"Invalid Email Format!"),s.a.createElement(C.a,{className:t.textfield,placeholder:"Enter Username*",name:"username",type:"text",variant:"outlined",fullWidth:!0,onChange:function(e){l(e.target.value)}}),U.length>0&&s.a.createElement("div",{id:"errorlabel"},U),s.a.createElement(C.a,{className:t.textfield,placeholder:"Enter Password*",name:"password",type:"password",variant:"outlined",fullWidth:!0,onChange:function(e){S(e.target.value)}}),q.length>0&&s.a.createElement("div",{id:"errorlabel"},q),s.a.createElement(C.a,{id:"standard-select-currency",select:!0,label:"Select",name:"college",onChange:function(e){k(e.target.value)},fullWidth:!0,helperText:"Please select your College"},s.a.createElement(M.a,{value:"Queens College"},"Queens"),s.a.createElement(M.a,{value:"Hunter College"},"Hunter"),s.a.createElement(M.a,{value:"Baruch"},"Baruch")),z.length>0&&s.a.createElement("div",{id:"errorlabel"},z),s.a.createElement(A.c,{to:{pathname:"/"},style:{textDecoration:"none"},onClick:function(t){!function(){ee(!0),0===u.length?_("fullname is blank"):0===f.length?(_(""),P("email is empty")):ne()?0===o.length?(_(""),P(""),G("Username is empty")):0===O.length?(_(""),P(""),G(""),K("password is empty")):(_(""),P(""),G(""),K(""),Z("College must be chosen")):(_(""),P("Invalid email format"));return o.length>0&&u.length>0&&f.length>0&&O.length>0&&N.length>0&&ne()}()?t.preventDefault():(t.preventDefault(),console.log(e.errorMsg),e.register(e.history,u,f,o,O,N))}},s.a.createElement(I.a,{fullWidth:!0,className:t.button},"Signup"))))})),q=Object(g.a)((function(e){return{container:{display:"flex",flexDirection:"column",alignItems:"center"},width:{width:"30%"},button:{background:"#35578f",border:0,borderRadius:3,boxShadow:"0 3px 5px 2px #33435e",color:"white",marginTop:30,height:"50px",textDecoration:"none",display:"block",textAlign:"center","&:hover":{background:"#33435e"}},textfield:{marginTop:20},header:{marginTop:60}}}));var K=Object(d.b)((function(e){return console.log(e),{isLoading:e.logged.isLoading,isLogged:e.logged.loggedIn,errorMsg:e.error.msg}}),(function(e){return{login:function(t,a,n){F(e,t,a,n)},clearErrors:function(){e({type:"CLEAR_ERRORS"})}}}))((function(e){var t=q(),a=Object(n.useState)(""),r=Object(m.a)(a,2),o=r[0],l=r[1],c=Object(n.useState)(""),i=Object(m.a)(c,2),u=i[0],p=i[1],g=Object(n.useState)(!1),h=Object(m.a)(g,2),f=(h[0],h[1]),E=Object(n.useState)(!1),b=Object(m.a)(E,2),v=(b[0],b[1],Object(n.useState)("")),O=Object(m.a)(v,2),S=O[0],y=O[1],j=Object(n.useState)(""),N=Object(m.a)(j,2),M=N[0],k=N[1];function w(t){e.clearErrors(),!function(){f(!0);var e=function(){for(var e=0,t=0,a=0;a<u.length;a++){var n=u.charAt(a);n==n.toUpperCase()&&e++,new RegExp(/^[\d]$/).test(n)&&t++}return t>0&&t<u.length&&e>0&&e<u.length}();0===o.length?y("Username is empty"):0===u.length?(y(""),k("password is empty")):u.length<7?(y(""),k("password needs to be more then eight characters")):e||(y(""),k("password needs at least one digit and one uppercase"));return u.length>=7&&e}()?t.preventDefault():(t.preventDefault(),e.login(e.history,o,u),console.log(e.errorMsg))}return Object(d.c)(),Object(n.useEffect)((function(){e.clearErrors()}),[]),s.a.createElement("div",{className:t.container},s.a.createElement(x.a,{className:t.header,variant:"h4"},"Welcome back!"),s.a.createElement("div",{className:t.width},s.a.createElement("div",{id:"errorlabel"},e.errorMsg),s.a.createElement("div",{className:"spaceForInput"},s.a.createElement(C.a,{placeholder:"Enter Username*",name:"username",type:"text",variant:"outlined",fullWidth:!0,className:t.textfield,onChange:function(e){l(e.target.value)}}),S.length>0&&s.a.createElement("div",{id:"errorlabel"},S)),s.a.createElement("div",{className:"spaceForInput"},s.a.createElement(C.a,{placeholder:"Enter Password*",name:"password",type:"password",variant:"outlined",fullWidth:!0,onChange:function(e){p(e.target.value)},className:t.textfield,onKeyPress:function(e){return"Enter"===e.key?w(e):null}}),M.length>0&&s.a.createElement("div",{id:"errorlabel"},M)),s.a.createElement(A.c,{to:{pathname:"/"},style:{textDecoration:"none"},onClick:w},s.a.createElement(I.a,{fullWidth:!0,className:t.button},"Login"))))})),H=a(30),V=a(6),z=a(325),Z=a(326),X=a(320),$=a(94),ee=a.n($),te=a(334),ae=a(319),ne=a(4),se=a(75),re=a.n(se),oe=a(147),le=a.n(oe),ce=a(332),ie=a(324),ue=a(322),me=a(323),de=a(321),pe=a(36),ge=a(145),he=a.n(ge),fe=a(91),Ee=a.n(fe);function be(e){e.username;var t=e.classes,a=e.getStudents,n=e.deleteClass;return t.map((function(e,t){return s.a.createElement(f.a,{button:!0,id:"listItem",component:A.b,onClick:function(){a(e,e._id)},key:t,className:"listItem"},s.a.createElement(E.a,{primary:e.courseName}),s.a.createElement(E.a,{primary:e.profName}),s.a.createElement(E.a,{primary:e.time}),s.a.createElement(ae.a,null,s.a.createElement(X.a,{onClick:function(){n(e._id)}},s.a.createElement(Ee.a,null)),s.a.createElement(X.a,null,s.a.createElement(re.a,null))))}))}var ve=a(146),Oe=a.n(ve),Ce=a(92),Se=a(93),ye=a.n(Se),je=a(76),Ne=a.n(je);function Ae(e){var t=e.classmates,a=e.currentUsername;return console.log(t,a),s.a.createElement(h.a,null,t.map((function(e,t){return s.a.createElement("div",null,e.username!=a&&s.a.createElement(f.a,null,s.a.createElement(E.a,{primary:e.username}),s.a.createElement(ae.a,null,s.a.createElement(Ce.Link,{to:{pathname:"/chat",state:{username:a,sendMessageTo:e.username}}},s.a.createElement(X.a,null,s.a.createElement(ye.a,null))),s.a.createElement(X.a,null,s.a.createElement(Ne.a,null)))))})))}var xe=function(e){return{avatar:{height:100,width:110},paper:{marginLeft:15,marginTop:40},infocontainer:{display:"flex",justifyContent:"space-between"},classList:{marginTop:8},infoleft:{marginLeft:15,display:"flex",flexDirection:"column",marginTop:-35},extraInfo:{display:"flex",marginBottom:20},extras:{marginLeft:8},image:{height:300,width:"100%",border:"2"},header:{textAlign:"center"}}},Me=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).openModal=function(){n.setState({isModalOpened:!0}),console.log(n.state.isModalOpened)},n.closeModal=function(){n.setState({isModalOpened:!1}),console.log(n.state.isModalOpened)},n.updateProfessorname=function(e){n.setState({profName:e.target.value})},n.updateClass=function(e){n.setState({class:e.target.value})},n.updateTime=function(e){n.setState({time:e.target.value})},n.addClass=function(){var e={courseName:n.state.class,profName:n.state.profName,time:n.state.time,username:n.props.userData.username};n.state.classes.push(e),n.setState({classes:n.state.classes}),w.a.post("http://localhost:5000/",{courseName:n.state.class,profName:n.state.profName,time:n.state.time,username:n.props.userData.username,nameOfUser:n.props.userData.fullName}).then().catch((function(e){console.log(e)})),n.setState({isModalOpened:!1})},n.delete=function(e){console.log(e),w.a.delete("http://localhost:5000/".concat(e)).then().catch((function(e){return console.log(e)}))},n.state={isModalOpened:!1,profName:"",class:"",time:"",classes:n.props.classess},n.styles={avatar:{height:100,width:110},paper:{marginLeft:15,marginTop:40},infocontainer:{display:"flex",justifyContent:"space-between"},classList:{marginTop:8},infoleft:{marginLeft:15,display:"flex",flexDirection:"column",marginTop:-35},extraInfo:{display:"flex",marginBottom:20},extras:{marginLeft:8},image:{height:300,width:"100%",border:"2"},header:{textAlign:"center"}},n}return Object(c.a)(a,[{key:"render",value:function(){return console.log(this.props),s.a.createElement(p.a,{container:!0},s.a.createElement(p.a,{container:!0,md:8,direction:"column"},s.a.createElement(b.a,{variant:"outlined",className:this.props.classes.paper},s.a.createElement("img",{src:Oe.a,className:this.props.classes.image}),s.a.createElement("div",{className:this.props.classes.infocontainer},s.a.createElement("div",{className:this.props.classes.infoleft},s.a.createElement(te.a,{src:he.a,id:"avatar",className:this.props.classes.avatar}),s.a.createElement(x.a,{variant:"h6"},this.props.userData.fullName),s.a.createElement(x.a,{variant:"h6"},"Student @ ",this.props.userData.college),s.a.createElement("div",{className:this.props.classes.extraInfo},s.a.createElement(x.a,{variant:"h6"},"Flushing,NY"),s.a.createElement(y.a,{orientation:"vertical",flexItem:!0}),s.a.createElement(x.a,{className:this.props.classes.extras,variant:"h6"},this.props.classess.length," classes"),s.a.createElement(y.a,{orientation:"vertical",flexItem:!0}),s.a.createElement(x.a,{className:this.props.classes.extras,variant:"h6"},this.props.classess.length," queriedClassMates"))),s.a.createElement("div",{className:this.props.classes.inforight},s.a.createElement(re.a,null)))),s.a.createElement(b.a,{className:this.props.classes.paper},s.a.createElement(h.a,{className:this.props.classes.classList},s.a.createElement(f.a,{className:"listItem",id:"topRowOfList"},s.a.createElement(E.a,{primary:"Class Name"}),s.a.createElement(E.a,{primary:"Professor Name"}),s.a.createElement(E.a,{primary:"Time Taken"}),s.a.createElement(ae.a,null,s.a.createElement(X.a,{onClick:this.openModal},s.a.createElement(le.a,null)),s.a.createElement(ce.a,{open:this.state.isModalOpened,onClose:this.closeModal,"aria-labelledby":"form-dialog-title"},s.a.createElement(de.a,{id:"form-dialog-title"},"Enter a Class"),s.a.createElement(ue.a,null,s.a.createElement(me.a,null,"Enter the class name, professor name, and time below:"),s.a.createElement(C.a,{autoFocus:!0,margin:"dense",id:"classname",label:"Class name:",type:"text",fullWidth:!0,onChange:this.updateClass}),s.a.createElement(C.a,{margin:"dense",id:"professor name",label:"Professor name:",type:"text",fullWidth:!0,onChange:this.updateProfessorname}),s.a.createElement(C.a,{margin:"dense",id:"time",label:"Time",type:"time",fullWidth:!0,onChange:this.updateTime})),s.a.createElement(ie.a,null,s.a.createElement(I.a,{onClick:this.closeModal,color:"primary"},"Cancel"),s.a.createElement(I.a,{onClick:this.addClass,color:"primary"},"Add Class"))))),s.a.createElement(be,{username:this.props.userData.username,classes:this.state.classes,getStudents:this.props.getStudentsForClass,deleteClass:this.delete})))),s.a.createElement(p.a,{md:4},s.a.createElement(b.a,{variant:"outlined",className:this.props.classes.paper},s.a.createElement(x.a,{className:this.props.classes.header,variant:"h6"},"Students for ",this.props.classInfo.courseName),s.a.createElement(Ae,{classmates:this.props.queriedClassMates,currentUsername:this.props.classInfo.username}))))}}]),a}(s.a.Component);var Ie=Object(pe.d)(Object(ne.a)(xe),Object(d.b)((function(e){return{userData:e.logged.user,classess:e.classes.currentClasses,queriedClassMates:e.classes.queriedClassMates,classInfo:e.classes.classInfo}}),(function(e){return{getStudentsForClass:function(t,a){console.log(t),function(e,t,a){var n=W();w.a.get("".concat(U,"classes/course/").concat(a),n).then((function(a){console.log(a.data),e({type:"GET_QUERIED_STUDENTS_FROM_DB",payload:a.data}),e({type:"SET_CLASS",payload:t})})).catch((function(e){console.log(e)}))}(e,t,a)}}})))(Me),ke=a(3),we=Object(g.a)((function(e){var t;return{menuButton:(t={marginRight:e.spacing(2)},Object(V.a)(t,e.breakpoints.up("xs"),{display:"none"}),Object(V.a)(t,e.breakpoints.down("xs"),{display:"block"}),t),title:{flexGrow:1,color:"#2daebd",fontWeight:"bolder",textDecoration:"none",fontSize:30,marginLeft:e.spacing(5)},link:{marginLeft:30,textDecoration:"none",fontSize:20,color:"#2daebd",fontWeight:"bolder"},login:{borderLeftWidth:2},navBar:{backgroundColor:"white",boxShadow:"none",position:"sticky",top:0},toolbar:e.mixins.toolbar,bigScreen:Object(V.a)({},e.breakpoints.down("xs"),{display:"none"}),underline:{textDecoration:"underline",textDecorationColor:"#35578f"},menuItems:{marginRight:e.spacing(9)},chat:{}}}));var Te=Object(d.b)((function(e){return console.log(e),{isLogged:e.logged.loggedIn}}),(function(e){return{signOut:function(){!function(e){e({type:"SIGN_OUT"}),e({type:"LOGOUT_SUCCESS"})}(e)}}}))(Object(H.withRouter)((function(e){var t,a,r,o,l,c=we(),i=Object(n.useState)("login"),u=Object(m.a)(i,2),d=u[0],p=u[1];return Object(n.useEffect)((function(){var t=e.history.location.pathname;t=t.substring(1),console.log(""==t),""==t&&p("Feed"),p(t)})),s.a.createElement("div",{id:"navbar",className:c.root},s.a.createElement(z.a,{id:"navbar",className:c.navBar,position:"static"},s.a.createElement(Z.a,{id:"navbar"},s.a.createElement(x.a,{variant:"h6",className:c.title},"Course-Chat"),s.a.createElement("div",{className:c.menuItems},!1===e.isLogged&&s.a.createElement(A.b,{onClick:function(){return p("signup")},className:Object(ke.a)((t={},Object(V.a)(t,c.link,!0),Object(V.a)(t,c.underline,"signup"===d),t)),to:"/signup"},"Sign-Up"),!1===e.isLogged&&s.a.createElement(A.b,{onClick:function(){return p("login")},className:Object(ke.a)((a={},Object(V.a)(a,c.link,!0),Object(V.a)(a,c.underline,"login"===d),a)),to:"/login"},"Login"),e.isLogged&&s.a.createElement(A.b,{onClick:function(){return p("Feed")},className:Object(ke.a)((r={},Object(V.a)(r,c.link,!0),Object(V.a)(r,c.underline,"Feed"===d),r)),to:"/"},"Feed"),e.isLogged&&s.a.createElement(A.b,{onClick:function(){return p("profile")},className:Object(ke.a)((o={},Object(V.a)(o,c.link,!0),Object(V.a)(o,c.underline,"profile"===d),o)),to:"/profile"},"Profile"),e.isLogged&&s.a.createElement(A.b,{onClick:function(){return p("chat")},className:Object(ke.a)((l={},Object(V.a)(l,c.link,!0),Object(V.a)(l,c.underline,"chat"===d),l)),to:"/chat"},"Messages"),e.isLogged&&s.a.createElement(A.b,Object(V.a)({onClick:function(){return p("login")},className:Object(ke.a)(Object(V.a)({},c.link,!0)),to:"/login"},"onClick",(function(){e.history.push("/login"),localStorage.setItem("state",void 0),localStorage.setItem("token",""),e.signOut()})),"LogOut")),s.a.createElement(X.a,{edge:"start",className:c.menuButton,color:"primary",size:"medium","aria-label":"menu"},s.a.createElement(ee.a,{color:"blue"})))))}))),Le=a(148),_e=a.n(Le),Re=(a(201),a(149)),De=a.n(Re),Ue=a(150),Ge=a.n(Ue),Fe=(a(265),a(99)),Be=a.n(Fe),We=function(e){var t=e.message,a=(e.currentChatter,e.username),n=t.text||t.message,r=t.created_at||"2020-07-01T08:35:13.634Z";r.length>5&&(r=r.substring(11,16));var o=parseInt(r.substring(0,2));o>12&&(r=(o%=12)+r.substring(2));var l=!0;return null!=t.from&&t.from!=a&&(l=!1,t.from.trim().toLowerCase()),l?s.a.createElement("div",{className:"messageContainer justifyEnd"},s.a.createElement("div",{className:"messageBox backgroundBlue"},s.a.createElement("p",{className:"messageText colorWhite"},Be.a.emojify(n))),s.a.createElement("p",{className:"time"},r)):s.a.createElement("div",{className:"messageContainer justifyStart"},s.a.createElement("div",{className:"messageBox backgroundLight"},s.a.createElement("p",{className:"messageText colorDark"},Be.a.emojify(n))),s.a.createElement("p",{className:"time"},r))},Pe=(a(266),function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){return Object(l.a)(this,a),t.call(this,e)}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement(Ge.a,{className:"messages"},this.props.messages.map((function(t,a){return s.a.createElement("div",{key:a},s.a.createElement(We,{message:t,currentChatter:e.props.currentChatter,username:e.props.currentUser}))})))}}]),a}(s.a.Component)),Qe=a(151),Je=a.n(Qe),Ye=(a(267),a(152)),qe=a.n(Ye),Ke=(a(268),function(e){var t=e.room,a=e.openModal;return s.a.createElement("div",{className:"infoBar"},s.a.createElement("div",{className:"leftInnerContainer"},s.a.createElement("img",{className:"onlineIcon",src:Je.a,alt:"online icon"}),s.a.createElement("h3",null,t)),s.a.createElement("div",{className:"rightInnerContainer"},s.a.createElement(I.a,{onClick:function(){return a()}},s.a.createElement(qe.a,null))))}),He=(a(269),function(e){var t=e.setMessage,a=e.sendMessage,n=e.message,r=e.currentChatter;return s.a.createElement("form",{className:"form"},s.a.createElement("input",{className:"input",type:"text",placeholder:"Type a message...",value:n,onChange:function(e){var a=e.target.value;return t(a)},onKeyPress:function(e){return"Enter"===e.key?a(e):null}}),s.a.createElement("button",{disabled:""==r,className:""!==r?"sendButton":"redSendButton",onClick:function(e){return a(e)}},"Send"))}),Ve=a(328),ze=(a(270),a(77)),Ze=a(327),Xe=a(333),$e=a(330),et=Object(g.a)((function(e){return{root:{padding:"10px 0px 10px 0px",display:"flex",alignItems:"center",width:"100%",borderTopColor:"gray"},input:{marginLeft:e.spacing(4),flex:1},iconButton:{padding:10},divider:{height:28,margin:4}}}));function tt(e){var t=et(),a=e.handleChangeSearchText;return s.a.createElement($e.a,{className:t.root,borderColor:"grey.500",borderTop:1,borderBottom:1},s.a.createElement(x.a,{variant:"h6"},"To:"),s.a.createElement(Xe.a,{className:t.input,placeholder:"Search classmates",onChange:function(e){return a(e.target.value)},fullWidth:!0}))}var at=a(153),nt=a.n(at),st=Object(g.a)({avatar:{backgroundColor:ze.a[100],color:ze.a[600]},grow:{justifyContent:"flex-end",flex:1},listItem:{color:ze.a[700],borderBottom:0},nameUnderUsername:{flexGrow:1,flexShrink:1,flexBasis:"auto",width:"100%"},username:{fontWeight:"bold",color:Ze.a[900]},name:{color:"gray"},courseName:{color:ze.a[800]},titleAndCloseIcon:{display:"flex"}});function rt(e){var t=st(),a=e.addChatter,r=e.closeModal,o=e.modalOpened,l=e.classMates,c=Object(n.useState)(l),i=Object(m.a)(c,2),u=i[0],d=i[1];return s.a.createElement(s.a.Fragment,null,s.a.createElement(ce.a,{id:"dialog",open:o,onClose:r,fullWidth:!0},s.a.createElement("div",{className:t.titleAndCloseIcon},s.a.createElement(de.a,{className:t.grow,id:"simple-dialog-title"},"New Message"),s.a.createElement(I.a,{onClick:function(){return r()}},s.a.createElement(nt.a,null))),s.a.createElement(tt,{handleChangeSearchText:function(e){var t=l.filter((function(t){return-1!=t.username.toLowerCase().indexOf(e.toLowerCase())}));d(t)}}),s.a.createElement(h.a,null,u.map((function(e,n){return s.a.createElement(f.a,Object(V.a)({className:t.listItem,button:!0,id:"listItem",onClick:function(){return function(e){a(e.username),r()}(e)},key:n},"className","listItem"),s.a.createElement(Ve.a,null,s.a.createElement(te.a,{className:t.avatar},s.a.createElement(Ne.a,null))),s.a.createElement("div",{className:t.nameUnderUsername},s.a.createElement(E.a,{className:t.username,primary:e.username}),s.a.createElement(E.a,{className:t.name,primary:e.nameOfUser})),s.a.createElement(E.a,{primary:e.courseName,className:t.courseName}))})))))}a(271),a(272);var ot=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.chatters,n=t.currentChatter,r=t.notification;return s.a.createElement("div",{className:"chattersList"},a.map((function(t){return s.a.createElement(f.a,{id:n==t?"currentChatter":"chatter",button:!0,onClick:function(){return e.props.changeChatter(t)}},s.a.createElement("p",null,t),s.a.createElement("br",null),r.user===t?s.a.createElement("p",null,r.message):null)})))}}]),a}(s.a.Component),lt={chatters:[],messages:[],socketId:""},ct=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).filterMessages=function(e,t){for(var a=[],s=0,r=0;r<e.length;r++)e[r].from!=t&&e[r].to!==t||(a[s++]=e[r]);console.log(a),n.setState({messagesToShow:a})},n.sendMessage=function(e){if(e.preventDefault(),""!=n.state.message){n.state.socket.emit("sendPrivateMessage",n.state.message,n.state.username,n.state.currentChatter,(function(){return n.setMessage("")}));var t=new Date,a=t.getMinutes();a/10<1&&(a="0"+a);var s=t.getHours()%12+":"+a,r={message:n.state.message,from:n.state.username,to:n.state.currentChatter,created_at:s};n.setState({messagesToShow:[].concat(Object(R.a)(n.state.messagesToShow),[r])}),n.props.addMessage(r),n.setState({allMessages:[].concat(Object(R.a)(n.state.allMessages),[r])}),n.setMessage("")}},n.setMessage=function(e){n.setState({message:e})},n.addChatter=function(e){var t=n.state.chatters.indexOf(e);console.log(t),-1==t&&n.setState({chatters:[].concat(Object(R.a)(n.state.chatters),[e])}),n.changeChatter(e)},n.changeChatter=function(e){n.state.notification.user===e&&n.setState({notification:{}}),n.setState({currentChatter:e}),n.filterMessages(n.state.allMessages,e)},n.openModal=function(){n.setState({modalOpened:!0})},n.closeModal=function(){n.setState({modalOpened:!1})},n.state={username:n.props.user.username,currentChatter:"",chatters:[],allMessages:[],messagesToShow:[],socket:De()("http://localhost:4000/"),message:"",modalOpened:!1,notification:{}},n}return Object(c.a)(a,[{key:"componentWillMount",value:function(){var e=this;console.log("mounted again");var t={},a=W();if(0!==this.props.allMessages.length&&0!=this.props.allChatters.length?(this.setState({allMessages:this.props.allMessages}),this.setState({chatters:this.props.allChatters})):(w.a.get("".concat(U,"messages/").concat(this.state.username,"/chatters"),a).then((function(a){console.log(a.data);var n=a.data.filter((function(t){return t!=e.state.username}));t.chatters=n,e.setState({chatters:n})})),w.a.get("".concat(U,"messages/").concat(this.state.username),a).then((function(a){t.messages=a.data,e.setState({allMessages:t.messages}),e.props.setMessagesAndChatters(t)})).then((function(){if(console.log("yay"),null!=e.props.location.state){console.log("only when u come from class component");var t=e.props.location.state.sendMessageTo;e.setState({currentChatter:t}),e.props.allChatters.includes(t)||e.setState({chatters:[].concat(Object(R.a)(e.state.chatters),[t])}),e.filterMessages(e.props.allMessages,t)}}))),null!=this.props.location.state){console.log("only when u come from class component");var n=this.props.location.state.sendMessageTo;this.setState({currentChatter:n}),this.props.allChatters.includes(n)||this.setState({chatters:[].concat(Object(R.a)(this.state.chatters),[n])}),this.filterMessages(this.props.allMessages,n)}this.setState({chatters:this.props.allChatters}),this.filterMessages(this.props.allMessages,this.state.currentChatter),this.state.socket.emit("user_connected",this.state.username),this.state.socket.on("private_message",(function(t,a){console.log("message received!"),a!==e.state.currentChatter?e.setState({notification:{message:t,user:a}}):e.setState({notification:{}}),-1===e.state.chatters.indexOf(a)&&e.setState({chatters:[].concat(Object(R.a)(e.state.chatters),[a])});t={from:a,to:e.state.username,message:t};e.props.addMessage(t),console.log(t),e.setState({allMessages:[].concat(Object(R.a)(e.state.allMessages),[t])}),e.filterMessages(e.state.allMessages,e.state.currentChatter)}))}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return s.a.createElement("div",{className:"outerContainer"},s.a.createElement(ot,{notification:this.state.notification,username:this.state.username,chatters:this.state.chatters,changeChatter:this.changeChatter,currentChatter:this.state.currentChatter}),s.a.createElement("div",{className:"container"},s.a.createElement(Ke,{openModal:this.openModal,room:this.state.currentChatter}),s.a.createElement(Pe,{messages:this.state.messagesToShow,currentChatter:this.state.currentChatter,currentUser:this.state.username}),s.a.createElement(He,{message:this.state.message,setMessage:this.setMessage,sendMessage:this.sendMessage,currentChatter:this.state.currentChatter}),this.state.modalOpened&&s.a.createElement(rt,{addChatter:this.addChatter,changeChatter:this.changeChatter,modalOpened:this.state.modalOpened,classMates:this.props.classMates,closeModal:this.closeModal})))}}]),a}(s.a.Component);ct.defaultProps={connectedClients:[],classMates:[],username:{username:"akhil"}};var it=Object(d.b)((function(e){return{allMessages:e.chatters.messages,allChatters:e.chatters.chatters,classMates:e.classes.classMates,user:e.logged.user}}),(function(e){return{setMessagesAndChatters:function(t){e({type:"set_messages_and_chatters_from_db",payload:t})},addMessage:function(t){e({type:"ADD_MESSAGE",payload:t})},addChatter:function(t){e({type:"ADD_CHATTER",payload:t})}}}))(ct),ut=a(154),mt={msg:"",status:null,id:null},dt={currentClasses:[],queriedClassMates:[],classInfo:{},classMates:[]},pt=[ut.a],gt=Object(pe.c)({logged:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGN_IN":return{loggedIn:!0};case"SIGN_OUT":return{loggedIn:!1};case"ADD_CLASS":return{classes:[].concat(Object(R.a)(e.classes),[t.payload])};case"USER_LOADING":return Object(P.a)({},e,{isLoading:!0});case"USER_LOADED":return Object(P.a)({},e,{loggedIn:!0,isLoading:!1,user:t.payload});case"LOGIN_SUCCESS":case"REGISTER_SUCCESS":return localStorage.setItem("token",t.payload.token),Object(P.a)({},e,{},t.payload,{loggedIn:!0,isLoading:!1,user:t.payload});case"AUTH_ERROR":case"LOGIN_FAIL":case"LOGOUT_SUCCESS":case"REGISTER_FAIL":return localStorage.removeItem("token"),Object(P.a)({},e,{token:null,user:null,loggedIn:!1,isLoading:!1});default:return e}},error:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:mt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return console.log(t.payload),Object(P.a)({},e,{msg:t.payload.msg,status:t.payload.status,id:t.payload.id});case"CLEAR_ERRORS":return Object(P.a)({},e,{msg:"",status:null,id:null});default:return e}},chatters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:lt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"set_messages_and_chatters_from_db":return{chatters:t.payload.chatters,messages:t.payload.messages};case"ADD_MESSAGE":return Object(P.a)({},e,{messages:[].concat(Object(R.a)(e.messages),[t.payload])});case"ADD_CHATTER":return Object(P.a)({},e,{chatters:[].concat(Object(R.a)(e.chatters),[t.payload])});default:return e}},classes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:dt,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_CLASS":return Object(P.a)({},e,{currentClasses:[].concat(Object(R.a)(e.currentClasses),[t.payload])});case"SET_STUDENTS":return console.log(t.payload),Object(P.a)({},e,{classMates:t.payload});case"GET_CLASSES_FROM_DB":return Object(P.a)({},e,{currentClasses:t.payload});case"GET_QUERIED_STUDENTS_FROM_DB":return Object(P.a)({},e,{queriedClassMates:t.payload});case"SET_CLASS":return Object(P.a)({},e,{classInfo:t.payload});default:return e}}});var ht=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){return void console.log(t)}}(),ft=Object(pe.e)((function(e,t){return"SIGN_OUT"===t.type&&(e=void 0),gt(e,t)}),ht,pe.a.apply(void 0,pt));ft.subscribe((function(){return function(e){try{var t=JSON.stringify(e);localStorage.setItem("state",t)}catch(a){console.log(a)}}(ft.getState())}));var Et=ft,bt=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"componentDidMount",value:function(){console.log("yo"),console.log(U)}},{key:"render",value:function(){return s.a.createElement(A.a,null,s.a.createElement("div",{className:"App"},s.a.createElement(Te,null),s.a.createElement(H.Route,{path:"/",exact:!0,component:N}),s.a.createElement(H.Route,{path:"/signup",component:Y}),s.a.createElement(H.Route,{path:"/login",component:K}),s.a.createElement(H.Route,{path:"/profile",component:Ie}),s.a.createElement(H.Route,{path:"/class",component:_e.a}),s.a.createElement(H.Route,{path:"/chat",component:it})))}}]),a}(s.a.Component);var vt=Object(d.b)(null,(function(e){return{loadUser:function(){B(e)}}}))(bt);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(d.a,{store:Et},s.a.createElement(vt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[168,1,2]]]);
//# sourceMappingURL=main.b3bdf79a.chunk.js.map