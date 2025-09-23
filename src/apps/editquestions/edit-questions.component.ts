import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

interface Question {
  titre: string;
  texte: string;
  options: { label: string; points: number }[];
}

@Component({
  selector: 'app-edit-questions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-questions.component.html',
})
export class EditQuestionsComponent implements OnInit {
  @Output() back = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<any>(); // émettre le client mis à jour
  @Input() client: any; // client reçu du parent

  questions: Question[] = [];
  reponses: (string | null)[] = [];
  showModal: boolean = false;
  etatClient: string = '';

  constructor(private service: SharedService, private router: Router) {}

  ngOnInit(): void {
    // Initialiser les questions
    this.questions = [
      {
        titre: "1 – Ernährung 🍎",
        texte: "Wie oft du Obst und Gemüse am Tag?",
        options: [
          { label: "Seltener als 1× täglich", points: 1 },
          { label: "1-2 mal täglich", points: 2 },
          { label: "3-4 mal täglich", points: 3 },
          { label: "Mehr als 5 mal täglich", points: 4 },
        ]
      },
      {
        titre: "2 – Flüssigkeitszufuhr 💧",
        texte: "Wie viel Wasser trinkst du pro Tag?",
        options: [
          { label: "Weniger als 1 Liter", points: 1 },
          { label: "1-2 Liter", points: 2 },
          { label: "2-3 Liter", points: 3 },
          { label: "Mehr als 3 Liter", points: 4 },
        ]
      },
      {
        titre: "3 – Schlaf 😴",
        texte: "Wie viele Stunden schläfst du im Durchschnitt pro Nacht?",
        options: [
      { label: "Unter 5 Stunden", points: 1 },
      { label: "Mehr als 8 Stunden", points: 2 },
      { label: "5-7 Stunden", points: 3 },
      { label: "Genau 8 Uhr", points: 4 },
        ]
      },
      {
        titre: "4 – Bewegung 🏃",
        texte: "Wie oft bewegst du dich aktiv (Sport, spazieren, Fahrrad)?",
        options: [
          { label: "Selten oder nie", points: 1 },
          { label: "1-2 mal pro Woche", points: 2 },
          { label: "3-4 mal pro Woche", points: 3 },
          { label: "Täglich", points: 4 },
        ]
      },
      {
        titre: "5 – Stresslevel 😰",
        texte: "Wie gestresst fühlst du dich im Alltag?",
        options: [
          { label: "Sehr gestresst", points: 1 },
          { label: "Etwas gestresst", points: 2 },
          { label: "Selten gestresst", points: 3 },
          { label: "Überhaupt nicht gestresst", points: 4 },
        ]
      },
      {
        titre: "6 – Rauchen 🚬",
        texte: "Wie oft rauchst du?",
        options: [
          { label: "Täglich", points: 1 },
          { label: "Gelegentlich", points: 2 },
          { label: "Ich habe früher geraucht", points: 3 },
          { label: "Ich habe nie geraucht", points: 4 },
        ]
      },
      {
        titre: "7 – Alkohol 🍺",
        texte: "Wie oft trinkst du Alkohol?",
        options: [
          { label: "Fast jeden Tag", points: 1 },
          { label: "1-3 mal pro Woche", points: 2 },
          { label: "1-2 mal pro Monat", points: 3 },
          { label: "Seltener oder nie", points: 4 },
        ]
      }
    ];

    // Initialiser les réponses existantes ou tableau vide
    this.reponses = this.client?.reponses ? [...this.client.reponses] : Array(this.questions.length).fill(null);
  }

  submitQuestions() {
    
    // Vérifier que toutes les réponses sont remplies
    const incomplete = this.reponses.some(r => r === null);
    if (incomplete) {
      alert("⚠️ Bitte beantworte alle Fragen (Veuillez répondre à toutes les questions).");
      return;
    }

    // Calculer score
    let scoreTotal = 0;
    this.reponses.forEach((label, i) => {
      const option = this.questions[i].options.find(opt => opt.label === label);
      if (option) scoreTotal += option.points;
    });

 
  // Définir le résultat détaillé
  if (scoreTotal >= 22) {
    this.etatClient = "Sehr gut ✅ \n" +
      "→ Du führst einen insgesamt sehr gesunden Lebensstil.\n" +
      "Deine Ernährung, Bewegung, Schlaf und Umgang mit Stress sind im sehr guten Bereich.\n" +
      "→ Behalte deine Routinen bei, achte weiterhin auf Balance.";
  } else if (scoreTotal >= 16) {
    this.etatClient = "Gut mit Verbesserungsmöglichkeiten 👍 \n" +
      "→ Du machst vieles richtig, aber es gibt Potenzial zur Optimierung.\n" +
      "Versuche, in kleinen Schritten, neue gesündere Gewohnheiten zu etablieren.";
  } else if (scoreTotal >= 11) {
    this.etatClient = "Kritisch ⚠️ \n" +
      "→ Dein Lebensstil weist mehrere Risikofaktoren auf.\n" +
      "Du schläfst möglicherweise zu wenig, bewegst dich selten, hast eine unregelmäßige Ernährung oder konsumierst regelmäßig Nikotin/Alkohol.\n" +
      "Setze dir ein konkretes Ziel (z. B. mehr Sport). Sprich auch mit einer Betreuungsperson.";
  } else {
    this.etatClient = "Alarming 🚨 \n" +
      "→ Dein aktueller Gesundheitsstatus ist besorgniserregend.\n" +
      "Deine Angaben deuten auf mehrere ernsthafte Risiken hin.\n" +
      "Bitte nimm diese Bewertung ernst und nutze sie als Chance aktiv zu werden.\n" +
      "Suche professionelle Hilfe (z. B. Hausarzt, Gesundheitsberatung).";
  }

    // Mettre à jour le client
    this.client.reponses = [...this.reponses];
    this.client.score = scoreTotal;
    this.client.etat = this.etatClient;

    // Émettre le client mis à jour au parent
    this.submitted.emit(this.client);

    // Afficher modal
    this.showModal = true;
  }

  goBack() {
    this.back.emit();
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/clients']);
  }
      goHome() {
    this.router.navigate(['/']); // Accueil
  }

  goList() {
    this.router.navigate(['/clients']); // Liste des clients
  }

}
