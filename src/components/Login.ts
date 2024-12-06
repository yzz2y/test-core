import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import resetCSS from '../Layout/resetCSS';
import pb from '../api/pocketbase';
import Swal from 'sweetalert2';

@customElement('login-element')
class Login extends LitElement {
  
  static styles: CSSResultGroup = [
    resetCSS,
    css`
      .container {
        max-width: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      
        & h1 {
          font-size: 3rem;
          font-weight: bold;
        }
      
        & hr {
          margin: 2rem 0;
          height: 4px;
          background-color: white;
        }
      
        & form {
          margin-bottom: 5rem;
      
          & input {
            box-sizing: border-box;
            border: 1px solid rgb(122, 122, 122);
            padding: 1rem;
            min-width: 300px;
            margin: 0.2rem 0;
            outline: none;
      
            &:focus {
              border: 1px solid dodgerblue;
            }
          }
      
          & button[type="submit"] {
            margin-top: 1.5rem;
            border: none;
            background: dodgerblue;
            color: white;
            padding: 1rem;
            cursor: pointer;
            width: 100%;
          }
        }
      }
    `
  ]

  get idInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#idField')!;
  }

  get pwInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#pwField')!;
  }

  async fetchData() {

    try {
      // const id = 'seonbeom2@gmail.com';
      // const pw = 'dkssud123!@';

      const id = this.idInput.value;
      const pw = this.pwInput.value;

      await pb.collection('users').authWithPassword(id, pw); // id와 pw가 유저가 입력한 정보와 일치하는지 확인해줌 (SDK)

      const {record, token} = JSON.parse( // 로그인이 되어있는지 안되어있는지 확인하기 위한 'auth' -> 구조분해 할당으로 받음
        localStorage.getItem('pocketbase_auth') ?? '{}'
      );

      localStorage.setItem('auth', JSON.stringify({ 
        isAuth: !!record,
        user: record,
        token: token
      }))

      Swal.fire({ // 'SweetAlert'을 활용한 alert창 커스텀
        title: '로그인 성공!',
        text: '메인 페이지로 이동합니다.',
        icon: 'success',
        confirmButtonText: '닫기'
      })
      .then(() => {
        setTimeout(() => {
          location.href = '/index.html';
        }, 300);
      });
    }


    catch {
      Swal.fire({
        title: '로그인 실패',
        text: '아이디 또는 비밀번호가 올바르지 않습니다.',
        icon: 'error',
        confirmButtonText: '닫기'
      })
      .then(() => {
        this.idInput.value = '';
        this.pwInput.value = '';
      })
    }
  }

  handleLogin(e: Event) {
    e.preventDefault();
    this.fetchData();
  }

  render() {
    return html `
      <div class="container">
        <h1>로그인</h1>
        <hr />
        <form>
          <div>
            <label for="idField"></label>
            <input type="email" id="idField" placeholder="아이디(이메일)" />
          </div>
          <div>
            <label for="pwField"></label>
            <input type="password" id="pwField" placeholder="비밀번호" />
          </div>
          <button 
            @click=${this.handleLogin}
            type="submit" 
            class="login"
            >LOGIN
          </button>
        </form>
  
        <a href="/src/pages/register/">간편 회원가입</a>
      </div>
    `;
  }
}