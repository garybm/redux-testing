// LYRIC INFO
const songList = {
  1: "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', '),
  2: "Woah- woah oh, Woah oh, woah oh -what you say?, Boricua- morena- dominicano- colombiano, Boricua- morena- cubano- mexicano, Oye mi canto, You see this is what they want, They want reggaetonWhat? What?, They want reggaeton, Esto es lo que quieren, toman reggaeton, Qué- qué?, Toman reggaeton".split(', ')
};

// INITIAL REDUX STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Bye Bye Bye",
      artist: "N'Sync",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "Oye Mi Canto",
      artist: "NORE",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
};

// REDUX REDUCER
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      })
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
}

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type){
    case 'CHANGE_SONG':
      return action.newSelectedSongId
    default:
      return state;
  }
}

// JEST TESTS + SETUP
const { expect } = window;

expect(songChangeReducer(initialState.currentSongId, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);

expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
  1: {
    title: "Bye Bye Bye",
    artist: "N'Sync",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "Oye Mi Canto",
    artist: "NORE",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  }
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
  1: {
    title: "Bye Bye Bye",
    artist: "N'Sync",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "Oye Mi Canto",
    artist: "NORE",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});

// REDUX STORE
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);

// RENDERING STATE IN DOM
// const renderLyrics = () => {
//   const lyricsDisplay = document.getElementById('lyrics');
//   while (lyricsDisplay.firstChild) {
//     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//   }
//   const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
//   const renderedLine = document.createTextNode(currentLine);
//   document.getElementById('lyrics').appendChild(renderedLine);
// }
//
// window.onload = function() {
//   renderLyrics();
// }

// CLICK LISTENER
// const userClick = () => {
//   if (store.getState().arrayPosition === store.getState().songLyricsArray.length - 1) {
//     store.dispatch({ type: 'RESTART_SONG' } );
//   } else {
//     store.dispatch({ type: 'NEXT_LYRIC' } );
//   }
// }

// SUBSCRIBE TO REDUX STORE
// store.subscribe(renderLyrics);
