
import { 
  Home, 
  Settings, 
  FileText, 
  BarChart, 
  User, 
  Shield, 
  Bell, 
  Mail, 
  Folder, 
  File,
  Lock,
  TrendingUp,
  DollarSign,
  Inbox,
  Send
} from 'lucide-react';


export const menuData = {
  titulo: "Dashboard",
  link: "/",
  componente: "Dashboard",
  icon: Home,
  hijos: [
    // Nodo con 3 niveles de profundidad
    {
      titulo: "Settings",
      link: "/settings",
      componente: "Settings",
      icon: Settings,
      hijos: [
        {
          titulo: "Profile",
          link: "/settings/profile",
          componente: "Profile",
          icon: User,
          hijos: [
            {
              titulo: "Personal Info",
              link: "/settings/profile/personal",
              componente: "PersonalInfo",
              icon: User,
              hijos: [] 
            },
            {
              titulo: "Preferences",
              link: "/settings/profile/preferences",
              componente: "Preferences",
              icon: Settings,
              hijos: [] 
            }
          ]
        },
        {
          titulo: "Security",
          link: "/settings/security",
          componente: "Security",
          icon: Shield,
          hijos: [
            {
              titulo: "Password",
              link: "/settings/security/password",
              componente: "Password",
              icon: Lock,
              hijos: [] 
            },
            {
              titulo: "2FA",
              link: "/settings/security/2fa",
              componente: "TwoFactorAuth",
              icon: Shield,
              hijos: [] 
            }
          ]
        },
        {
          titulo: "Notifications",
          link: "/settings/notifications",
          componente: "Notifications",
          icon: Bell,
          hijos: [] 
        }
      ]
    },

    {
      titulo: "Reports",
      link: "/reports",
      componente: "Reports",
      icon: FileText,
      hijos: [
        {
          titulo: "Analytics",
          link: "/reports/analytics",
          componente: "Analytics",
          icon: BarChart,
          hijos: [
            {
              titulo: "Traffic",
              link: "/reports/analytics/traffic",
              componente: "Traffic",
              icon: TrendingUp,
              hijos: [] 
            },
            {
              titulo: "Sales",
              link: "/reports/analytics/sales",
              componente: "Sales",
              icon: DollarSign,
              hijos: [] 
            }
          ]
        },
        {
          titulo: "Documents",
          link: "/reports/documents",
          componente: "Documents",
          icon: File,
          hijos: [] // Nodo hoja
        }
      ]
    },
    // Nodo con 2 niveles de profundidad
    {
      titulo: "Messages",
      link: "/messages",
      componente: "Messages",
      icon: Mail,
      hijos: [
        {
          titulo: "Inbox",
          link: "/messages/inbox",
          componente: "Inbox",
          icon: Inbox,
          hijos: [] // Nodo hoja
        },
        {
          titulo: "Sent",
          link: "/messages/sent",
          componente: "Sent",
          icon: Send,
          hijos: [] // Nodo hoja
        }
      ]
    },
    // Nodo sin hijos (nodo hoja en nivel 1)
    {
      titulo: "Files",
      link: "/files",
      componente: "Files",
      icon: Folder,
      hijos: [] // Nodo hoja
    }
  ]
};

/**
 * Funciones auxiliares para trabajar con el árbol
 */

/**
 * Busca un nodo en el árbol por su link usando DFS
 * @param {Object} node - Nodo actual
 * @param {string} link - Link a buscar
 * @returns {Object|null} - Nodo encontrado o null
 */
export const findNodeByLink = (node, link) => {
  if (node.link === link) {
    return node;
  }
  
  if (node.hijos && node.hijos.length > 0) {
    for (const child of node.hijos) {
      const found = findNodeByLink(child, link);
      if (found) return found;
    }
  }
  
  return null;
};

/**
 * Obtiene la profundidad máxima del árbol
 * @param {Object} node - Nodo raíz
 * @returns {number} - Profundidad máxima
 */
export const getTreeDepth = (node) => {
  if (!node.hijos || node.hijos.length === 0) {
    return 1;
  }
  
  const depths = node.hijos.map(child => getTreeDepth(child));
  return 1 + Math.max(...depths);
};

/**
 * Cuenta el número total de nodos en el árbol
 * @param {Object} node - Nodo raíz
 * @returns {number} - Total de nodos
 */
export const countNodes = (node) => {
  if (!node.hijos || node.hijos.length === 0) {
    return 1;
  }
  
  const childCount = node.hijos.reduce((sum, child) => sum + countNodes(child), 0);
  return 1 + childCount;
};

/**
 * Obtiene todos los nodos hoja (sin hijos) del árbol
 * @param {Object} node - Nodo raíz
 * @returns {Array} - Array de nodos hoja
 */
export const getLeafNodes = (node) => {
  if (!node.hijos || node.hijos.length === 0) {
    return [node];
  }
  
  return node.hijos.flatMap(child => getLeafNodes(child));
};

/**
 * Obtiene la ruta desde la raíz hasta un nodo específico
 * @param {Object} node - Nodo raíz
 * @param {string} targetLink - Link del nodo objetivo
 * @param {Array} path - Ruta actual (usado en recursión)
 * @returns {Array|null} - Array de nodos formando la ruta o null
 */
export const getPathToNode = (node, targetLink, path = []) => {
  const newPath = [...path, node];
  
  if (node.link === targetLink) {
    return newPath;
  }
  
  if (node.hijos && node.hijos.length > 0) {
    for (const child of node.hijos) {
      const found = getPathToNode(child, targetLink, newPath);
      if (found) return found;
    }
  }
  
  return null;
};

// Información del árbol para debugging
console.log('🌳 Menu Tree Stats:');
console.log(`  - Total nodes: ${countNodes(menuData)}`);
console.log(`  - Tree depth: ${getTreeDepth(menuData)}`);
console.log(`  - Leaf nodes: ${getLeafNodes(menuData).length}`);

export default menuData;