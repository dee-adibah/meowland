import React from 'react';
import maine from '../assets/maine.png';
import abyssinian from '../assets/abyssinian.png';
import bengal from '../assets/bengal.png';
import chartreux from '../assets/chartreux.png';
import american_curl from '../assets/american_curl.png';
import oriental from '../assets/oriental.png';
import selkirk from '../assets/selkirk.png';
import './breed.css';

const Breed = () => {
  return (
    <div className='pml__blog section__padding' id='blog'>
      <div className='pml__blog-heading'>
        <h1 className='gradient__text'>
          Let get to know the different breed of cats
        </h1>
      </div>
      <div className='pml__blog-container'>
        <div className='pml__blog-container_groupB'>
          <div className='pml__blog-container_article'>
            <div className='pml__blog-container_article-image'>
              <img src={maine} alt='blog_image' />
            </div>
            <div className='pml__blog-container_article-content'>
              <h3>Maine Coon</h3>
              <h4>
                a large breed of domestic cat that is native to the United
                States, particularly the state of Maine. It is known for its
                distinctive physical appearance, with long, shaggy fur, tufted
                ears, and a long, bushy tail.
              </h4>
            </div>
          </div>
          <div className='pml__blog-container_article'>
            <div className='pml__blog-container_article-image'>
              <img src={abyssinian} alt='blog_image' />
            </div>
            <div className='pml__blog-container_article-content'>
              <h3>Abyssinian</h3>
              <h4>
                The Abyssinian is often a colorful cat with a distinctly ticked
                coat, medium in size and regal in appearance; lithe, hard and
                muscular, showing eager activity and lively interest in their
                surroundings. They are often well balanced temperamentally and
                physically.
              </h4>
            </div>
          </div>
          <div className='pml__blog-container_article'>
            <div className='pml__blog-container_article-image'>
              <img src={american_curl} alt='blog_image' />
            </div>
            <div className='pml__blog-container_article-content'>
              <h3>American Curl</h3>
              <h4>
                The distinctive feature of the American Curl is their
                attractive, uniquely curled-back ears. Elegant, well balanced,
                moderately muscled, slender rather than massive in build. They
                often appear well proportioned and balanced and can vary in
                size.
              </h4>
            </div>
          </div>
          <div className='pml__blog-container_article'>
            <div className='pml__blog-container_article-image'>
              <img src={bengal} alt='blog_image' />
            </div>
            <div className='pml__blog-container_article-content'>
              <h3>Bengal</h3>
              <h4>
                The Bengal is a domestic cat that has physical features
                distinctive to the small forest-dwelling wildcats, and with the
                loving, dependable temperament of a family pet. As such, some
                characteristics in the appearance of the Bengal are distinct
                from those found in other domestic cat breeds.
              </h4>
            </div>
          </div>
          <div className='pml__blog-container_article'>
            <div className='pml__blog-container_article-image'>
              <img src={chartreux} alt='blog_image' />
            </div>
            <div className='pml__blog-container_article-content'>
              <h3>Chartreux</h3>
              <h4>
                The Chartreux is a sturdy, shorthaired French breed coveted in
                antiquity for its hunting prowess and its dense, water repellent
                fur. This breed’s husky, robust type is sometimes termed
                primitive, neither cobby nor classic. Though amply built,
                Chartreux are extremely supple and agile cats; refined, never
                coarse nor clumsy.
              </h4>
            </div>
          </div>
          <div className='pml__blog-container_article'>
            <div className='pml__blog-container_article-image'>
              <img src={oriental} alt='blog_image' />
            </div>
            <div className='pml__blog-container_article-content'>
              <h3>Oriental Short Hair</h3>
              <h4>
                The Oriental is a svelte cat with long, tapering lines, very
                lithe but muscular. Excellent physical condition. Eyes clear.
                Strong and lithe, neither bony nor flabby. Because of the longer
                coat, the Longhair Division appears to have softer lines and
                less extreme type than the Shorthair Division.Oriental Short
                Hairs
              </h4>
            </div>
          </div>
          <div className='pml__blog-container_article'>
            <div className='pml__blog-container_article-image'>
              <img src={selkirk} alt='blog_image' />
            </div>
            <div className='pml__blog-container_article-content'>
              <h3>Selkirk Rex</h3>
              <h4>
                The Selkirk Rex is the result of a dominant, spontaneous
                mutation that causes each hair (guard, down and awn) to have a
                gentle curl giving the coat a soft feel. The Selkirk Rex is a
                medium to large cat with heavy boning that gives the cat
                surprising weight and an impression of power.
              </h4>
            </div>
          </div>
          <h3 className='gradient__text'>Will be updating more. Stay tuned!</h3>
          {/* <Article
            imgUrl={maine}
            title='Maine Coon'
            text='a large breed of domestic cat that is native to the United States, particularly the state of Maine. It is known for its distinctive physical appearance, with long, shaggy fur, tufted ears, and a long, bushy tail.'
          />
          <Article
            imgUrl={}
            title='Abyssinian'
            text='The Abyssinian is often a colorful cat with a distinctly ticked coat, medium in size and regal in appearance; lithe, hard and muscular, showing eager activity and lively interest in their surroundings. They are often well balanced temperamentally and physically.'
          />
          <Article
            imgUrl={maine}
            title='Maine Coon'
            text='a large breed of domestic cat that is native to the United States, particularly the state of Maine. It is known for its distinctive physical appearance, with long, shaggy fur, tufted ears, and a long, bushy tail.'
          />
          <Article
            imgUrl={maine}
            title='Maine Coon'
            text='a large breed of domestic cat that is native to the United States, particularly the state of Maine. It is known for its distinctive physical appearance, with long, shaggy fur, tufted ears, and a long, bushy tail.'
          />
          <Article
            imgUrl={maine}
            title='Maine Coon'
            text='a large breed of domestic cat that is native to the United States, particularly the state of Maine. It is known for its distinctive physical appearance, with long, shaggy fur, tufted ears, and a long, bushy tail.'
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Breed;
