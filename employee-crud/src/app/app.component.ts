import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <header class="container header">
  <h1>Employee Registry</h1>
  <nav aria-label="Primary navigation">
    <a routerLink="/employees" class="nav-link" tabindex="0">Employees</a>
    <a routerLink="/employees/create" class="nav-link" tabindex="0">Create</a>
  </nav>
</header>

<main class="container main-content" role="main">
  <router-outlet></router-outlet>
</main>

<footer class="container footer small-text" role="contentinfo">
  Built with Angular 20 Standalone | Powered by LocalStorage 
</footer>
  `,
  styles: [`
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 28px 32px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #eff598ff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(90deg, #1a2a6c, #146eb4);
  box-shadow: 0 4px 12px rgba(20, 110, 180, 0.4);
  color: #f0f4f8;
  gap: 18px;
}

h1 {
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.05em;
}

nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: #c3daf9;
  font-weight: 600;
  font-size: 1.15rem;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  outline-offset: 4px;
}

.nav-link:hover,
.nav-link:focus-visible {
  color: #1a2a6c;
  background-color: #d0e3ff;
  box-shadow: 0 0 12px rgba(19, 42, 108, 0.7);
  text-decoration: none;
}

.main-content {
  margin-top: 32px;
  padding: 24px;
  background-color: #f9fbff;
  border-radius: 0 0 12px 12px;
  box-shadow: inset 0 0 12px #ebf1ff;
  min-height: 450px;
}

.footer {
  margin-top: 40px;
  padding: 16px 0;
  text-align: center;
  color: #5a6d85;
  background-color: #d7e1f7;
  border-radius: 0 0 12px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}

.small-text {
  font-size: 0.9rem;
  color: #5a6d85;
}

@media (max-width: 720px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  nav {
    gap: 16px;
  }

  .container {
    padding: 20px 24px;
  }
}


  `]
})
export class AppComponent {}
