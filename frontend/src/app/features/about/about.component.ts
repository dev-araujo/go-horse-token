import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `<div class="about-container container">
    <h1>Sobre o GoHorse Token (GOHO)</h1>

    <p>Bem-vindo ao mundo caótico e glorioso do GoHorse!</p>

    <p>
      O token GOHO é a representação digital da filosofia GoHorse de
      desenvolvimento: fazer funcionar, não importa como, e celebrar as soluções
      mais... criativas.
    </p>

    <img src="gohorsesymbol.jpeg" alt="GoHorse Logo" class="logo" />
    <h2>A Filosofia</h2>
    <ul>
      <li>Entregue primeiro, pergunte (ou corrija) depois.</li>
      <li>Testes são para os fracos (mas talvez seja bom ter alguns).</li>
      <li>A gambiarra bem feita é uma obra de arte incompreendida.</li>
      <li>Se funciona, não mexa (até quebrar de forma espetacular).</li>
    </ul>

    <h2>O Token</h2>
    <p>
      Use GOHO para recompensar feitos heroicos de programação GoHorse,
      participar de votações sem sentido ou simplesmente acumular como um troféu
      de suas próprias batalhas no código.
    </p>
    <p>
      <strong>Lembre-se:</strong> Este token é para fins de diversão e
      aprendizado, inspirado na cultura dev brasileira. Não possui valor
      financeiro real (a menos que você encontre outro entusiasta GoHorse
      disposto a trocar por café).
    </p>
  </div>`,
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
