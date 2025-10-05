import React from 'react';
import { X, Calendar, Mail, Building, TrendingUp, Award, GraduationCap, Phone } from 'lucide-react';
import { InternDTO } from '../../services/internService';

interface InternDetailModalProps {
  intern: InternDTO | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InternDetailModal({ intern, isOpen, onClose }: InternDetailModalProps) {
  if (!isOpen || !intern) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-white font-semibold text-xl">
                {intern.prenom[0]}{intern.nom[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{intern.prenom} {intern.nom}</h3>
                <p className="text-gray-600 dark:text-gray-300">{intern.department}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{intern.email}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">Téléphone</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{intern.phone}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Building className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">Département</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{intern.department}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <GraduationCap className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">École</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{intern.school}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">Date de début</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {new Date(intern.startDate).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">Date de fin</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {new Date(intern.endDate).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="h-5 w-5 text-orange-500" />
              <h4 className="font-medium text-gray-900 dark:text-white">Statut</h4>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              intern.status === 'ACTIVE'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                : intern.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                : intern.status === 'COMPLETED'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {intern.status}
            </span>
          </div>

          {/* Notes */}
          {intern.notes && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">Notes</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{intern.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Fermer
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
              Modifier le stagiaire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}