import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup, signOut}from "firebase/auth";
import { UserOutlined, ShoppingOutlined,PoweroffOutlined } from '@ant-design/icons'
import { Button, Popover, Divider } from 'antd'
import { useState, useReducer, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { app } from "../../fireBase"
const User = ()=> {
      const [, forceUpdate] = useReducer(x => x + 1, 0)
      const [, setVisible] = useState(false)
      const [user, setUser] = useState('Login')
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider
      const router = useRouter()
      const redirect = ()=> {
        router.push({
          pathname: '/myorders',
          query: { user: auth.currentUser.uid},
        })
    }


      const updateUser = () => {
        setUser(auth.currentUser.displayName)
        forceUpdate()
      }
      useEffect(()=>{
        if(auth.currentUser == null){}
        else{
          updateUser()
        }
      },[auth])
      // console.log(auth)
      const signout = ()=>{
        signOut(auth).then(() => {
          // Sign-out successful.
          // console.log('Sign-out')
          setUser('Login')
          forceUpdate()
          router.push('/')
        }).catch((error) => {
          // An error happened.
          // console.log('Error',error)
        });
      }
      
      const gSignIn = () => {
        if(auth.currentUser== null){
          setPersistence(auth, browserLocalPersistence)
            .then(() => {
              signInWithPopup(auth, provider)
                .then((result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential = GoogleAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;
                  // The signed-in user info.
                  const user = result.user;
                  // setGuser(user)
                  setUser(`Hey ${user.displayName}`)
                  forceUpdate()
                  // ...
                }).catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // console.log(errorMessage)
                  // The email of the user's account used.
                  const email = error.customData.email;
                  // The AuthCredential type that was used.
                  const credential = GoogleAuthProvider.credentialFromError(error);
                  // ...
                });
            })
        }
      }


        const content = (
          <div>
            <Button onClick={() =>redirect()} className="cart-icon" type="text" icon={<ShoppingOutlined />}>
            My Orders
            </Button>
            <Divider />
            <Button className="cart-icon" type="text" onClick={() =>signout()}icon={<PoweroffOutlined />}>
            Logout
            </Button>
          </div>
        );
      return(
           
          auth.currentUser == null ? 
          <Button className="cart-icon" type="text" icon={<UserOutlined />} onClick={()=>{gSignIn()}}>
          {user}
          </Button>
          :
        <Popover
        placement="bottomRight"
        style={{ width: '500px' }}
        content={content}
        trigger="click"
      >

        <Button className="cart-icon" type="text" icon={<UserOutlined />}>
          {auth.currentUser.displayName || user}
        </Button>

        </Popover>
      )
  }

  export default User