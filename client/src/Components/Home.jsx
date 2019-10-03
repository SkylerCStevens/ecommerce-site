import React from "react";
import AutoSlider from "./AutoSlider";

function Home() {
  return (
    <div>
      <h1 className="page-header text-center home-title">
        Welcome to Hummingbird Guitars!
      </h1>
      {/* Component for home page automatic slider */}
      <AutoSlider />

      <section className="container mt-3 mb-3 border-bottom border-top">
        <h2 className="page-header ml-5 about-title">About Us:</h2>
        <div className="about-p">
          <p>
            Hummingbird Guitars was founded in 2016 with a shared passion for
            quality guitars. Started by Skyler Stevens and Robert M.G. in a warm
            garage in the Carolinas. With only basic tools Skyler was taught the
            skill of woodworking from their grandfather Robert. After Skyler
            built their first guitar, they saved all their money working at the
            local Piggly Wiggly to buy new tools. In High School Skyler started
            to fix guitars up for money. This led to an entrepreneurial passion,
            that became Hummingbird Guitars.
          </p>
          <p>
            There is a myth that if a hummingbird stops moving they die. To
            pursue their dreams Skyler did not stop working on guitars, almost
            every second of their day was spent working on guitars at one point.
            They never stopped moving. This work ethic lent itself to the name
            Hummingbird Guitars.
          </p>
          <p>
            Hummingbird Guitars is perfect for anyone looking for a great deal.
            All of our products have been thoroughly inspected and set up by
            trained experts before they leave our shop. We also partner with the
            manufacturers for giveaways whenever possible so keep your eye on
            the site for those too! Our business is family owned and operated.
            The founders spent 5 years training with the world's top luthiers.
            There's no better place to shop!
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
