const DOM = {
  okBtn: document.querySelector(".okBtn"),
  randomBtn: document.querySelector(".randomBtn"),
  typeSelector: document.querySelector(".type"),
  number: document.querySelector(".number"),
  factBox: document.querySelector(".fact-box"),
}

const getFact = (number = "random", type = "math") => {
  state.updateState({loading: true});
  return new Promise((resolve, reject) => {
    fetch(`http://numbersapi.com/${number}/${type}`)
      .then((res) => res.text())
      .then((data) => {
        showFact(data);
        state.updateState({loading: false});
        resolve(data)
      })
      .catch((err) => {
        state.updateState({loading: false});
        reject(err)
      } );
  });
}

class State{
  state = {
    loading:  false,
    number:  "random",
    type:  "math",
  }

  updateState(props){
    this.state = {
      ...this.state,
      ...props,
    }
  }
}

const state = new State();

DOM.number.addEventListener("input", (event) => {
  state.updateState({
    [event.target.name]: event.target.value,
  });
  console.log(state.state);
});

DOM.typeSelector.addEventListener("change", (event) => {
  state.updateState({
    [event.target.name]: event.target.value,
  });
  console.log(state);
});

// getFact().then(data => console.log(data));

DOM.okBtn.addEventListener("click", () => {
  state.updateState({loading: true});
  console.log("Loading...")
  showSpinner();
  getFact(state.state.number, state.state.type)
    .then(fact => {
      console.log(fact);
      state.updateState({loading: false});
    })
    .catch(err => {
      console.error(err);
    });
});

DOM.randomBtn.addEventListener("click", () => {
  state.updateState({loading: true});
  console.log("Loading...")
  showSpinner();
  getFact("random", state.state.type)
    .then(fact => {
      console.log(fact);
      state.updateState({loading: false});
    })
    .catch(err => {
      console.error(err);
    });
});

const showFact = (fact) => {
  DOM.factBox.innerHTML = fact;
}

const showSpinner = () => {
  DOM.factBox.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
}