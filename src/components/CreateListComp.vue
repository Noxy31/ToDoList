<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Category {
  idCategory: number;
  labelCategory: string;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const labelList = ref('');
    const isPersonal = ref(false);
    const categories = ref<Category[]>([]);
    const selectedCategory = ref(null);

    const fetchCategories = async () => {
      try {
        const response = await fetch('api/categories', {
          // on récupère les catégories
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des catégories');
        }

        categories.value = await response.json();
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    };

    onMounted(() => {
      fetchCategories();
    });

    const createList = async () => {
      try {
        const response = await fetch('api/users/getUserId', {
          // on récupère l'id de l'user qui est actuellement connecté
          method: 'GET',
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'ID utilisateur");
        }

        const { id: userId } = await response.json();

        const listData = {
          labelList: labelList.value,
          listCreationTime: new Date().toISOString(),
          isArchived: false,
          isPersonal: isPersonal.value,
          idUser: userId,
          idCategory: selectedCategory.value
        };

        const createResponse = await fetch('api/list/create', {
          // requète de création de liste
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listData)
        });

        if (!createResponse.ok) {
          throw new Error('Erreur lors de la création de la liste');
        }

        router.push({ name: 'ListsComp' }); // on redirige vers le composant Lists
      } catch (error) {
        console.error("Erreur lors de l'ajout de la liste :", error);
      }
    };

    return {
      labelList,
      isPersonal,
      categories,
      selectedCategory,
      createList
    };
  }
});
</script>

<template>
  <div>
    <h1>Create a new list</h1>
    <form @submit.prevent="createList">
      <div>
        <label for="labelList">Name of the list</label>
        <input type="text" v-model="labelList" required />
      </div>
      <div>
        <label>Personnal list</label>
        <input type="checkbox" v-model="isPersonal" />
      </div>
      <div>
        <label for="category">Category:</label>
        <select v-model="selectedCategory" required>
          <option
            v-for="category in categories"
            :key="category.idCategory"
            :value="category.idCategory"
          >
            {{ category.labelCategory }}
          </option>
        </select>
      </div>
      <button type="submit">Créer la liste</button>
    </form>
  </div>
</template>

<style scoped></style>
