<template>
  <div class="home">
    <nav>
      <ul>
        <li>
          <div>
            <router-link to="/">Strona główna</router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/pageNotFound">O aplikacji</router-link>
          </div>
        </li>
        <li>
          <div class="decoration">
            <router-link to="/login">Zaloguj</router-link>
          </div>
        </li>
      </ul>
    </nav>
    <div class="content">
      <div class="text">
        <h2 class="name">SURVEY</h2>
        <h2 class="subtitle">Aplikacja dla Ciebie!</h2>
        <p class="engageText">
          {{ helloText }}
        </p>
        <button class="start">Rozpocznij</button>
      </div>
      <div class="svg">
        <img src="../assets/landing.png" alt="landing" />
      </div>
    </div>
    <footer class="myFooter">
      <p>
        © 2020 Dybek & Wicher & Sirant. Wszystkie prawa zastrzeżone. Made with
        ❤️ and ☕
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      helloText:
        "Potrzebujesz ankiet? Jesteśmy jak google forms, tylko lepsi. Z Survey zapomnisz o excelu - analizę wyników zrobimy za Ciebie! Z nami wykonasz swoją pracę tak szybko, że zostanie ci czas na pykanie w CS!",
    };
  },
};
</script>

<style lang='scss'>
.home {
  width: 100%;
  height: 100%;
  color: rgb(40, 41, 56);
  display: flex;
  flex-direction: column;

  nav {
    width: 100%;
    padding: 10px 10px;

    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;

      li {
        width: 25%;
        text-align: center;
        font-size: 20px;
        &:last-child {
          margin-left: auto;
        }
        a {
          text-decoration: none;
          color: rgb(40, 41, 56);
        }

        .decoration {
          margin-left: auto;
          margin-right: auto;
          width: 30%;
          border: 2px solid rgb(40, 41, 56);
          border-radius: 20px;
        }
      }
    }
  }

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      width: 40%;
      padding: 40px 40px;
      h2 {
        font-size: 54px;
      }
      .name {
        color: rgb(255, 181, 56);
      }
      .subtitle {
        color: rgb(40, 41, 56);
      }
      .engageText {
        margin-top: 20px;
        color: rgb(40, 41, 56);
      }
      .start {
        background-color: rgb(40, 41, 56);
        color: #fff;
        padding: 15px 30px;
        border-radius: 30px;
        &:active {
          outline: none;
          border: none;
        }
        &:focus {
          outline: none;
          border: none;
        }
      }
    }
    .svg {
      width: 60%;
      padding: 20px 20px;
      img {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        height: 90%;
      }
    }
  }

  .myFooter {
    position: absolute;
    bottom: 0;
    left: 0;
    //background-color: red;
    padding: 10px 10px;
    width: 100%;
    text-align: center;
  }
}

@media (min-width: 276px) {
  .home {
    //background-color: yellow;
    nav {
      ul {
        li {
          width: 100%;
          .decoration {
            width: 60%;
          }
        }
      }
    }
    .content {
      flex-direction: column;

      .text {
        width: 100%;
        padding: 40px 40px;
      }
      .svg {
        width: 100%;
        padding: 0px 40px;
        img {
          width: 95%;
          height: 95%;
        }
      }
    }
  }
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .home {
    //background-color: green;
    nav {
      ul {
        li {
          width: 100%;
          .decoration {
            width: 50%;
          }
        }
      }
    }
    .content {
      flex-direction: row;

      .text {
        width: 100%;
        padding: 40px 40px;
      }
      .svg {
        width: 100%;
        padding: 0px 40px;
        img {
          width: 95%;
          height: 95%;
        }
      }
    }
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  .home {
    //background-color: burlywood;
    nav {
      ul {
        li {
          width: 35%;
        }
      }
    }
    .content {
      flex-direction: row;
    }
  }
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  .home {
    //background-color: red;
  }
}
</style>
