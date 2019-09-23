import React from 'react'
import Slider from './Slider'

function Home() {
    return (
    <div>
    <h1 className="text-center position-absolute home-title">Welcome to Hummingbird Guitars!</h1>

    <Slider />     

    <section className="container mt-3 mb-3 border-bottom">
      <h2 className="ml-5">About Us:</h2>
      <p className="about-p">Hummingbird Guitars was founded in 2016 with a shared passion for quality guitars. Started by Skyler Stevens and Robert M.G. It is the perfect for anyone looking for a great deal. All of our products have been thoroughly inspected and set up by trained experts before they leave our shop. We also partner with the manufacturers for giveaways whenever possible so keep your eye on the site for those too! Our business is family owned and operated. The founders spent 5 years training with the world's top luthiers. There's no better place to shop!</p>
    </section>
    </div>
    )}

export default Home;