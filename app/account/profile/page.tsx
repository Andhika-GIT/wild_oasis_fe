import { UpdateProfileForm } from "@/components/molecules";
import { getCountries } from "@/app/action/country";
import { getCurrentUser } from "@/app/action/user";


export const metadata = {
  title: "Update profile",
};

export default async function Page() {

  const defaultCountry = "France";

  const [currentUser, countries] = await Promise.all([
    getCurrentUser(),
    getCountries(),
  ]);


  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm currentUser={currentUser} countries={countries || [] }/>
    </div>
  );
}
