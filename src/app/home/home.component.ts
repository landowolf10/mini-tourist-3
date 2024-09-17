import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  locations = [
    { title: 'Ixtapa Zihuatanejo', description: 'Ixtapa, el lugar blanco, en lengua náhuatl, es uno de los destinos de playa emblemáticos de México. Es un complejo turístico desarrollado a sólo seis kilómetros de la típica población pesquera de Zihuatanejo, por lo que popularmente se le conoce como Ixtapa Zihuatanejo; en realidad, son dos destinos en un mismo lugar. Cada año recibe más de dos millones de visitantes atraídos por su clima tropical, la belleza de sus playas, la hospitalidad de sus habitantes y sus servicios turísticos, de categoría y clase mundial, mientras que Zihua mantiene su atractivo ambiente tradicional de población de pescadores.', imgClass: 'img-locacion img-locacion-1' },
    { title: 'Acapulco', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae id, incidunt officiis nesciunt consequatur.', imgClass: 'img-locacion img-locacion-2' },
    { title: 'Morelia', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae id, incidunt officiis nesciunt consequatur.', imgClass: 'img-locacion img-locacion-3' },
  ];

  selectedTitle: string = '';
  selectedBody: string = '';

  openModal(location: any) {
    this.selectedTitle = location.title;
    this.selectedBody = location.description;

    

    // Show the modal
    const modalElement = document.getElementById('infoModal');
    if (modalElement) {
      console.log(this.selectedTitle);
      console.log(this.selectedBody);
      modalElement.style.display = 'block';
    }
  }

  closeModal() {
    // Hide the modal
    const modalElement = document.getElementById('infoModal');
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }
}
