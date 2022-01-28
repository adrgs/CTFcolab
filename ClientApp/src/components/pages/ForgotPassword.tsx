import * as React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../services/i18n';
import { inject, observer } from 'mobx-react';

@inject("AuthStore", "UserStore")
@observer
export default class ForgotPassword extends React.Component<any> {

   componentWillUnmount() {
      this.props.AuthStore.reset();
   }

   handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.props.AuthStore.setUsername(e.target.value);
   };

   handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.props.AuthStore.setEmail(e.target.value);
   };

   handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let promise : Promise<any> | undefined | null = this.props.AuthStore.forgotpassword();
      if (promise) {
         promise.finally(() => {
            if (!this.props.AuthStore.errors) {
               this.props.history.replace("/login");
            }
         });
      }
   };

   render() {
      const { values, errors, inProgress } = this.props.AuthStore;

      return (
         <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
               <div
                  className="
               max-w-[675px]
               mx-auto
               text-center
               bg-white
               dark:bg-gray-900
               rounded-lg
               relative
               overflow-hidden
               py-16
               px-10
               sm:px-12
               md:px-[60px]
               "
               >
                  <div className="max-w-[475px] mx-auto text-center">
                     <div className="mb-10 md:mb-16 text-center">
                        <a
                           href="#"
                           className="inline-block max-w-[160px] mx-auto"
                        >
                           <img src="/img/logo-vertical.png" alt="logo" />
                        </a>
                     </div>
                     <form onSubmit={this.handleSubmitForm}>
                        <div className="mb-6">
                           <input
                              type="text"
                              placeholder={i18n.t("username").toString()}
                              value={values.username}
                              onChange={this.handleUsernameChange}
                              name="username"
                              className="
                        w-full
                        rounded-md
                        border
                        border-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-black
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                           />
                        </div>
                        <div className="mb-6">
                           <input
                              type="text"
                              placeholder={i18n.t("email_address").toString()}
                              value={values.email}
                              onChange={this.handleEmailChange}
                              name="email"
                              className="
                        w-full
                        rounded-md
                        border
                        border-[#E9EDF4]
                        py-3
                        px-5
                        bg-[#FCFDFE]
                        text-base text-black
                        placeholder-[#ACB6BE]
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                           />
                        </div>
                        <h2 className={'text-[#ED4A50] pb-4 ' + (errors ? 'visible' : 'invisible')}>
                        Error: {errors}
                        </h2>
                        <div className="mb-10">
                           <input
                              type="submit"
                              value={i18n.t("send_recovery_email").toString()}
                              disabled={inProgress}
                              className="
                        w-full
                        rounded-md
                        border
                        border-[#006bef]
                        py-3
                        px-5
                        bg-[#007bff]
                        text-base text-white
                        cursor-pointer
                        hover:bg-opacity-90
                        transition
                        "
                           />
                        </div>
                     </form>
                     <p className="text-base text-[#adadad]">
                        {i18n.t("not_a_member_yet").toString()}?&nbsp;
                        <Link
                           to="/signup"
                           className="text-primary hover:underline"
                        >
                           {i18n.t("sign_up").toString()}
                        </Link>
                     </p>
                     <br></br>
                     <p className="text-base text-[#adadad]">
                        {i18n.t("already_have_an_account").toString()}?&nbsp;
                        <Link
                           to="/login"
                           className="text-primary hover:underline"
                        >
                           {i18n.t("login").toString()}
                        </Link>
                     </p>
                     <div>
                        <span className="absolute top-1 right-1">
                           <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <circle
                                 cx="1.39737"
                                 cy="38.6026"
                                 r="1.39737"
                                 transform="rotate(-90 1.39737 38.6026)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="1.39737"
                                 cy="1.99122"
                                 r="1.39737"
                                 transform="rotate(-90 1.39737 1.99122)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="13.6943"
                                 cy="38.6026"
                                 r="1.39737"
                                 transform="rotate(-90 13.6943 38.6026)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="13.6943"
                                 cy="1.99122"
                                 r="1.39737"
                                 transform="rotate(-90 13.6943 1.99122)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="25.9911"
                                 cy="38.6026"
                                 r="1.39737"
                                 transform="rotate(-90 25.9911 38.6026)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="25.9911"
                                 cy="1.99122"
                                 r="1.39737"
                                 transform="rotate(-90 25.9911 1.99122)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="38.288"
                                 cy="38.6026"
                                 r="1.39737"
                                 transform="rotate(-90 38.288 38.6026)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="38.288"
                                 cy="1.99122"
                                 r="1.39737"
                                 transform="rotate(-90 38.288 1.99122)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="1.39737"
                                 cy="26.3057"
                                 r="1.39737"
                                 transform="rotate(-90 1.39737 26.3057)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="13.6943"
                                 cy="26.3057"
                                 r="1.39737"
                                 transform="rotate(-90 13.6943 26.3057)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="25.9911"
                                 cy="26.3057"
                                 r="1.39737"
                                 transform="rotate(-90 25.9911 26.3057)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="38.288"
                                 cy="26.3057"
                                 r="1.39737"
                                 transform="rotate(-90 38.288 26.3057)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="1.39737"
                                 cy="14.0086"
                                 r="1.39737"
                                 transform="rotate(-90 1.39737 14.0086)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="13.6943"
                                 cy="14.0086"
                                 r="1.39737"
                                 transform="rotate(-90 13.6943 14.0086)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="25.9911"
                                 cy="14.0086"
                                 r="1.39737"
                                 transform="rotate(-90 25.9911 14.0086)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="38.288"
                                 cy="14.0086"
                                 r="1.39737"
                                 transform="rotate(-90 38.288 14.0086)"
                                 fill="#ED4A50"
                              />
                           </svg>
                        </span>
                        <span className="absolute left-1 bottom-1">
                           <svg
                              width="40"
                              height="40"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <circle
                                 cx="1.39737"
                                 cy="38.6026"
                                 r="1.39737"
                                 transform="rotate(-90 1.39737 38.6026)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="1.39737"
                                 cy="1.99122"
                                 r="1.39737"
                                 transform="rotate(-90 1.39737 1.99122)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="13.6943"
                                 cy="38.6026"
                                 r="1.39737"
                                 transform="rotate(-90 13.6943 38.6026)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="13.6943"
                                 cy="1.99122"
                                 r="1.39737"
                                 transform="rotate(-90 13.6943 1.99122)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="25.9911"
                                 cy="38.6026"
                                 r="1.39737"
                                 transform="rotate(-90 25.9911 38.6026)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="25.9911"
                                 cy="1.99122"
                                 r="1.39737"
                                 transform="rotate(-90 25.9911 1.99122)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="38.288"
                                 cy="38.6026"
                                 r="1.39737"
                                 transform="rotate(-90 38.288 38.6026)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="38.288"
                                 cy="1.99122"
                                 r="1.39737"
                                 transform="rotate(-90 38.288 1.99122)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="1.39737"
                                 cy="26.3057"
                                 r="1.39737"
                                 transform="rotate(-90 1.39737 26.3057)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="13.6943"
                                 cy="26.3057"
                                 r="1.39737"
                                 transform="rotate(-90 13.6943 26.3057)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="25.9911"
                                 cy="26.3057"
                                 r="1.39737"
                                 transform="rotate(-90 25.9911 26.3057)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="38.288"
                                 cy="26.3057"
                                 r="1.39737"
                                 transform="rotate(-90 38.288 26.3057)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="1.39737"
                                 cy="14.0086"
                                 r="1.39737"
                                 transform="rotate(-90 1.39737 14.0086)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="13.6943"
                                 cy="14.0086"
                                 r="1.39737"
                                 transform="rotate(-90 13.6943 14.0086)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="25.9911"
                                 cy="14.0086"
                                 r="1.39737"
                                 transform="rotate(-90 25.9911 14.0086)"
                                 fill="#ED4A50"
                              />
                              <circle
                                 cx="38.288"
                                 cy="14.0086"
                                 r="1.39737"
                                 transform="rotate(-90 38.288 14.0086)"
                                 fill="#ED4A50"
                              />
                           </svg>
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}