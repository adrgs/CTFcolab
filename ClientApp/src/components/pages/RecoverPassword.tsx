import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

@inject("AuthStore", "UserStore")
@observer
class RecoverPassword extends React.PureComponent<any> {
   componentWillUnmount() {
      this.props.AuthStore.reset();
   }

   handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.props.AuthStore.setPassword(e.target.value);
   };

   handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.props.AuthStore.setRepeatPassword(e.target.value);
   };

   handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let promise : Promise<any> | undefined | null = this.props.AuthStore.recoverpassword();
      if (promise) {
         promise.finally(() => {
            if (!this.props.AuthStore.errors) {
               this.props.history.replace("/login");
            }
         });
      }
   };

   constructor(props: any)
   {
      super(props);

      this.props.AuthStore.values.id = this.props.match.params.userid && parseInt(this.props.match.params.userid);
      this.props.AuthStore.values.resetPasswordCode = this.props.match.params.guid;
   }


   public render() {
      const { values, errors, inProgress } = this.props.AuthStore;

      return (<div className="flex flex-wrap -mx-4">
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
               <p className="text-base text-[#adadad]">
                  Change password for user
               </p>
               <br></br>
               <form onSubmit={this.handleSubmitForm}>
               <div className="mb-6">
                     <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={this.handlePasswordChange}
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
                        type="password"
                        placeholder="Repeat password"
                        name="repeat-password"
                        value={values.repeatPassword}
                        onChange={this.handleRepeatPasswordChange}
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
                     <input type="hidden" name="userid" value={this.props.match.params.userid}></input>
                     <input type="hidden" name="guid" value={this.props.match.params.guid}></input>
                  </div>
                  <h2 className={'text-[#ED4A50] pb-4 ' + (errors ? 'visible' : 'invisible')}>
                        Error: {errors}
                  </h2>
                  <div className="mb-10">
                     <input
                        type="submit"
                        value="Change password"
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
   </div>)
   }
}

export default RecoverPassword;
