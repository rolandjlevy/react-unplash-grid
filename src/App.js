import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as superagent from 'superagent';

const clientID =
  "8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d";

const { useState, useEffect, useRef } = React;

const simpleGet = options => {
  superagent.get(options.url)
  .then(res => {
    if (options.onSuccess) options.onSuccess(res);
  });
};

const App = () => {
  let [photos, setPhotos] = useState([]);
  let [query, setQuery] = useState("");
  const queryInput = useRef(null);

  const numberOfPhotos = 10;
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;

  useEffect(() => {
    const photosUrl = query ? `${url}&query=${query}` : url;
    simpleGet({
      url: photosUrl,
      onSuccess: res => {
        setPhotos(res.body);
      }
    });
  }, [query, url]);

  const searchPhotos = e => {
    e.preventDefault();
    setQuery(queryInput.current.value);
  };

  return (
    <div className="box">
      <form
        id="unsplash-search"
        className="unsplash-search form"
        onSubmit={searchPhotos}
      >
        <label>
          Search Photos on Unsplash
          <input
            ref={queryInput}
            placeholder="Try 'dogs' or 'coffee'!"
            type="search"
            className="input"
            defaultValue=""
            style={{ marginBottom: 20 }}
          />
        </label>
      </form>

      <ul className="photo-grid">
        {photos.map(photo => {
          return (
            <li key={photo.id}>
              <img
                src={photo.urls.regular}
                onSuccessfulClipboardCopy={() => {
                  // showUserMessage();
                  // pingUnsplash(photo.links.download_location);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.render(
//   <div className="App">
//     <header className="App-header">
//       <img src="/logo.svg" className="App-logo" alt="logo" />
//       <h3> React on Repl.it! </h3>
//       <p>
//         Edit <code>src/App.js</code> to get started!
//       </p>
//     </header>
//   </div>,
//   document.getElementById('root')
// );
