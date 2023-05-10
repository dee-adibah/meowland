import React from 'react';
import catparty from '../../assets/catparty.png';
import './header.css';

const Header = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <div className='pml__header section__padding' id='home'>
          <div className='pml__header-content'>
            <h1 className='gradient__text'>Welcome to Meowy Community!!</h1>
            <p>
              Our forum is the perfect place for cat lovers to come together,
              share their experiences, and connect with like-minded individuals.
              Whether you're a seasoned cat owner or a new cat parent, our
              community is here to support you and provide a wealth of knowledge
              and resources on all things feline. <br />
              Join discussions about cat health and wellness, behavior and
              training, food and nutrition, and much more. Share photos and
              videos of your beloved cats, and get feedback and advice from
              fellow community members. We believe that every cat is unique and
              deserves the best care and attention, and our community is
              dedicated to helping you provide that.
              <br />
              Our forum is a safe and friendly space, where respect and kindness
              are paramount. We encourage open and honest discussions, but ask
              that all members refrain from any offensive or disrespectful
              behavior. Our moderators are always here to ensure that the forum
              remains a positive and supportive environment for everyone.
              <br />
            </p>
            <p className='pml__cta'>
              So what are you waiting for? Join our cat community forum today
              and connect with fellow cat lovers from around the world!
            </p>
          </div>

          <div className='pml__header-image'>
            <img src={catparty} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
