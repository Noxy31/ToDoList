<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const labelList = ref('');
    const isPersonal = ref(false);

    const createList = async () => {
      try {
        const response = await fetch('api/users/getUserId', {
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
          idUser: userId
        };

        const createResponse = await fetch('api/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(listData)
        });

        if (!createResponse.ok) {
          throw new Error('Erreur lors de la création de la liste');
        }

        router.push({ name: 'ListsComp' });
      } catch (error) {
        console.error("Erreur lors de l'ajout de la liste:", error);
      }
    };

    return {
      labelList,
      isPersonal,
      createList
    };
  }
});
</script>

<template>
  <div>
    <h1>Créer une nouvelle liste</h1>
    <form @submit.prevent="createList">
      <div>
        <label for="labelList">Nom de la liste:</label>
        <input type="text" v-model="labelList" required />
      </div>
      <div>
        <label>Liste personnelle:</label>
        <input type="checkbox" v-model="isPersonal" />
      </div>
      <button type="submit">Créer la liste</button>
    </form>
  </div>
</template>

<style scoped></style>
